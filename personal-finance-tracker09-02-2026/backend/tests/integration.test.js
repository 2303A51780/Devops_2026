const request = require("supertest");
const app = require("../server"); // export app from server.js

describe("Integration Tests - Personal Finance APIs", () => {

  test("Dashboard API should return summary", async () => {
    const res = await request(app).get("/api/dashboard");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalIncome");
    expect(res.body).toHaveProperty("totalExpenses");
  });

  test("Expenses API create and fetch", async () => {
    const expense = { title: "Food", amount: 200 };

    await request(app)
      .post("/api/expenses")
      .send(expense)
      .expect(201);

    const res = await request(app).get("/api/expenses");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Income API create and fetch", async () => {
    const income = { source: "Salary", amount: 5000 };

    await request(app)
      .post("/api/income")
      .send(income)
      .expect(201);

    const res = await request(app).get("/api/income");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

});
