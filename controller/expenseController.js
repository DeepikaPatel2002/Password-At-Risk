const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {

console.log("Authorization Header:", req.headers.authorization);

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: "Token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use process.env.JWT_SECRET
    console.log("Decoded JWT:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


exports.addExpense = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let { amount, description, category } = req.body;

    //  Ensure amount is a number
    amount = parseFloat(amount);

    if (isNaN(amount)) {
      return res.status(400).json({ error: "Amount must be a number" });
    }

    const expense = await Expense.create({
      amount,
      description,
      category,
      userId: req.user.id
    });

    res.status(201).json({ expense });
  } catch (err) {
    console.error("Add expense error:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ expenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.destroy({ where: { id } });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.getDailyTotal = async (req, res) => {
  try {
    const userId = req.user.id;

    // Start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Start of tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Fetch today's expenses
    const expenses = await Expense.findAll({
      where: {
        userId,
        createdAt: { [Op.between]: [today, tomorrow] }
      }
    });

    //  Use exp.amount (FLOAT column)
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.status(200).json({ dailyTotal: total });
  } catch (err) {
    console.error("Daily total error:", err);
    res.status(500).json({ error: err.message });
  }
};
