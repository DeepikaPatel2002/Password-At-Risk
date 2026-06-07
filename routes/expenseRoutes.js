
const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');
const verifyToken = require("../middleware/autnMiddleware");

router.post('/add-expense', verifyToken, expenseController.addExpense);
router.get('/get-expenses', verifyToken, expenseController.getExpenses);
router.delete('/delete-expense/:id', verifyToken, expenseController.deleteExpense);
// router.get('/daily-total', verifyToken, expenseController.getDailyTotal);

module.exports = router;
