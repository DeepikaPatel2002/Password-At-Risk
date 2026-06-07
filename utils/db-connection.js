
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('signup_db', 'root', '987654', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
