import React, { useState } from "react";

const Dashboard = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");

  const balance = (Number(income) || 0) - (Number(expenses) || 0);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.icon}>💰 Personal finance Tracker</div>
          <h1>Finance Dashboard</h1>
          <p style={styles.subtitle}>Track your income and expenses easily</p>
        </div>

        <div style={styles.cards}>
          {/* Income Card */}
          <div style={styles.card}>
            <h3 style={{color: "Black"}}>Total Income</h3>
            <input
              type="number"
              placeholder="Enter income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Expense Card */}
          <div style={styles.card}>
            <h3 style={{color: "Black"}}>Total Expenses</h3>
            <input
              type="number"
              placeholder="Enter expenses"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Balance Card */}
          <div style={styles.card}>
            <h3 style={{color: "Black"}}>Balance</h3>
            <h2
              style={{
                color: balance >= 0 ? "#16a34a" : "#dc2626",
                marginTop: "10px",
              }}
            >
              ₹ {balance}
            </h2>
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
  },
  container: {
    width: "100%",
    maxWidth: "900px",
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
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    background: "#f9fafb",
    padding: "25px",
    borderRadius: "12px",
    width: "220px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  input: {
    marginTop: "12px",
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },
};

export default Dashboard;
