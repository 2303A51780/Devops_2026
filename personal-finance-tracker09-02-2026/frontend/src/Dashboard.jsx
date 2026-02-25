import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Dashboard = () => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/dashboard`);
      setDashboard(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/expenses`);
      setExpenses(response.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  // Fetch incomes
  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/income`);
      setIncomes(response.data);
    } catch (err) {
      console.error("Failed to fetch incomes:", err);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchDashboard();
    fetchExpenses();
    fetchIncomes();
  }, []);

  // Add expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!expenseTitle || !expenseAmount) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/expenses`, {
        title: expenseTitle,
        amount: parseFloat(expenseAmount),
      });
      setExpenseTitle("");
      setExpenseAmount("");
      await fetchDashboard();
      await fetchExpenses();
      setError("");
    } catch (err) {
      setError("Failed to add expense");
      console.error(err);
    }
  };

  // Add income
  const handleAddIncome = async (e) => {
    e.preventDefault();
    if (!incomeSource || !incomeAmount) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/income`, {
        source: incomeSource,
        amount: parseFloat(incomeAmount),
      });
      setIncomeSource("");
      setIncomeAmount("");
      await fetchDashboard();
      await fetchIncomes();
      setError("");
    } catch (err) {
      setError("Failed to add income");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.icon}>💰 Personal Finance Tracker</div>
          <h1>Finance Dashboard</h1>
          <p style={styles.subtitle}>Track your income and expenses easily</p>
          {error && <p style={styles.errorMessage}>{error}</p>}
        </div>

        {/* Summary Cards */}
        <div style={styles.cards}>
          {/* Income Card */}
          <div style={styles.card}>
            <h3 style={{ color: "Black" }}>Total Income</h3>
            <h2 style={{ color: "#16a34a", marginTop: "10px" }}>
              ₹ {dashboard.totalIncome.toFixed(2)}
            </h2>
          </div>

          {/* Expense Card */}
          <div style={styles.card}>
            <h3 style={{ color: "Black" }}>Total Expenses</h3>
            <h2 style={{ color: "#dc2626", marginTop: "10px" }}>
              ₹ {dashboard.totalExpenses.toFixed(2)}
            </h2>
          </div>

          {/* Balance Card */}
          <div style={styles.card}>
            <h3 style={{ color: "Black" }}>Balance</h3>
            <h2
              style={{
                color: dashboard.balance >= 0 ? "#16a34a" : "#dc2626",
                marginTop: "10px",
              }}
            >
              ₹ {dashboard.balance.toFixed(2)}
            </h2>
          </div>
        </div>

        {/* Add Forms */}
        <div style={styles.formsContainer}>
          {/* Add Expense Form */}
          <form style={styles.form} onSubmit={handleAddExpense}>
            <h3>Add Expense</h3>
            <input
              type="text"
              placeholder="Expense title"
              value={expenseTitle}
              onChange={(e) => setExpenseTitle(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Add Expense
            </button>
          </form>

          {/* Add Income Form */}
          <form style={styles.form} onSubmit={handleAddIncome}>
            <h3>Add Income</h3>
            <input
              type="text"
              placeholder="Income source"
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Add Income
            </button>
          </form>
        </div>

        {/* Lists */}
        <div style={styles.listsContainer}>
          {/* Expenses List */}
          <div style={styles.list}>
            <h3>Recent Expenses ({expenses.length})</h3>
            {expenses.length === 0 ? (
              <p style={styles.emptyText}>No expenses yet</p>
            ) : (
              <ul style={styles.ul}>
                {expenses.map((exp) => (
                  <li key={exp.id} style={styles.li}>
                    {exp.title}: ₹ {exp.amount}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Income List */}
          <div style={styles.list}>
            <h3>Recent Income ({incomes.length})</h3>
            {incomes.length === 0 ? (
              <p style={styles.emptyText}>No income yet</p>
            ) : (
              <ul style={styles.ul}>
                {incomes.map((inc) => (
                  <li key={inc.id} style={styles.li}>
                    {inc.source}: ₹ {inc.amount}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Segoe UI, Arial, sans-serif",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "1000px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  header: {
    marginBottom: "30px",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#666",
    marginTop: "5px",
  },
  errorMessage: {
    color: "#dc2626",
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#fee2e2",
    borderRadius: "8px",
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  card: {
    background: "#f9fafb",
    padding: "25px",
    borderRadius: "12px",
    width: "220px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  formsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  form: {
    background: "#f9fafb",
    padding: "20px",
    borderRadius: "12px",
    width: "300px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  input: {
    marginTop: "12px",
    marginBottom: "12px",
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  listsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  list: {
    background: "#f9fafb",
    padding: "20px",
    borderRadius: "12px",
    width: "300px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: "10px 0 0 0",
  },
  li: {
    padding: "10px",
    backgroundColor: "white",
    marginBottom: "8px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  emptyText: {
    color: "#999",
    fontStyle: "italic",
  },
};

export default Dashboard;
