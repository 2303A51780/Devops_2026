const express = require('express');
const app = express();
const port = 5000;

// Manual CORS setup (without cors package)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Sample data
const dashboardData = {
  totalIncome: 5000,
  totalExpenses: 3000,
};

// API
app.get('/api/dashboard', (req, res) => {
  res.json(dashboardData);
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
