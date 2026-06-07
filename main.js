
require('dotenv').config();
const express = require('express');
const sequelize = require('./utils/db-connection');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/expense', expenseRoutes);

app.use('/api', userRoutes);

sequelize.sync()
  .then(() => {
    console.log("Database synced");
    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  })
  .catch(err => console.error("DB connection error:", err));