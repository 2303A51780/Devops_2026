const request = require("supertest");
const { app, resetData } = require("../server");

beforeEach(() => {
  resetData(); // reset memory before each test
});

describe("Integration Tests - Personal Finance APIs", () => {

  test("Dashboard API returns summary", async () => {
    const res = await request(app).get("/api/dashboard");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalIncome");
    expect(res.body).toHaveProperty("totalExpenses");
  });

  test("Create and fetch expense", async () => {
    await request(app)
      .post("/api/expenses")
      .send({ title: "Food", amount: 200 })
      .expect(201);

    const res = await request(app).get("/api/expenses");
    expect(res.body.length).toBe(1);
  });

  test("Create and fetch income", async () => {
    await request(app)
      .post("/api/income")
      .send({ source: "Salary", amount: 5000 })
      .expect(201);

    const res = await request(app).get("/api/income");
    expect(res.body.length).toBe(1);
  });

});
