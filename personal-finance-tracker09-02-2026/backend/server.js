const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Manual CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// -----------------------------
// In-memory storage
// -----------------------------
let expenses = [];
let incomes = [];

// -----------------------------
// Dashboard API
// -----------------------------
app.get("/api/dashboard", (req, res) => {
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  res.status(200).json({
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses
  });
});

// -----------------------------
// Expenses APIs
// -----------------------------

// Create expense
app.post("/api/expenses", (req, res) => {
  const { title, amount } = req.body;

  if (!title || !amount) {
    return res.status(400).json({ message: "Title and amount required" });
  }

  const newExpense = {
    id: Date.now(),
    title,
    amount: Number(amount)
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// Get all expenses
app.get("/api/expenses", (req, res) => {
  res.status(200).json(expenses);
});

// -----------------------------
// Income APIs
// -----------------------------

// Create income
app.post("/api/income", (req, res) => {
  const { source, amount } = req.body;

  if (!source || !amount) {
    return res.status(400).json({ message: "Source and amount required" });
  }

  const newIncome = {
    id: Date.now(),
    source,
    amount: Number(amount)
  };

  incomes.push(newIncome);
  res.status(201).json(newIncome);
});

// Get all income
app.get("/api/income", (req, res) => {
  res.status(200).json(incomes);
});

// -----------------------------
// Export for testing
// -----------------------------
module.exports = app;

// Start server only if NOT testing
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
