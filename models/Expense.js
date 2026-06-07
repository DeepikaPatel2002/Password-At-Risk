const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');
const User = require('./User');

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = Expense;
