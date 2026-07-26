/**
 * Sprint 2 - Expense Management System
 * Author: Amit Jaggernauth
 * Expense Tracking System - Version 2, Student B
 * APIs: list all expenses, update expense, search expenses
 */

const express = require("express");
const router = express.Router();

let expenses = []; // In-memory storage

// reset expenses (for testing)
function resetExpenses() {
  expenses = [];
}

// Helper: build new expense (used by create route, typically Student A)
function buildExpense(body) {
  const {
    userId,
    categoryId,
    amount,
    description,
    date,
  } = body;

  const now = new Date().toISOString();

  return {
    id: expenses.length + 1,
    userId,
    categoryId,
    amount,
    description,
    date,
    dateCreated: now,
    dateModified: now,
  };
}

// CREATE expense (Student A responsibility, included here for tests)
router.post("/", (req, res) => {
  const { userId, categoryId, amount, description, date } = req.body;

  if (
    userId === undefined ||
    categoryId === undefined ||
    amount === undefined ||
    description === undefined ||
    date === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  if (typeof amount !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Amount must be a number" });
  }

  const expense = buildExpense(req.body);
  expenses.push(expense);

  res.status(201).json({ success: true, data: expense });
});

// LIST all expenses (Week 1 - Student B)
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: expenses });
});

// UPDATE expense (Week 2 - Student B)
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return res
      .status(404)
      .json({ success: false, message: "Expense not found" });
  }

  const { amount, description, categoryId, date } = req.body;

  // Require at least amount and description for update
  if (amount === undefined || description === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  if (typeof amount !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Amount must be a number" });
  }

  expense.amount = amount;
  expense.description = description;

  if (categoryId !== undefined) {
    expense.categoryId = categoryId;
  }

  if (date !== undefined) {
    expense.date = date;
  }

  expense.dateModified = new Date().toISOString();

  res.status(200).json({ success: true, data: expense });
});

// SEARCH expenses (Week 3 - Student B)
// Supports query by description substring and/or categoryId
router.get("/search", (req, res) => {
  const { q, categoryId } = req.query;

  let results = expenses;

  if (q) {
    const lower = q.toLowerCase();
    results = results.filter((e) =>
      e.description && e.description.toLowerCase().includes(lower)
    );
  }

  if (categoryId !== undefined) {
    const catIdNum = parseInt(categoryId, 10);
    results = results.filter((e) => e.categoryId === catIdNum);
  }

  res.status(200).json({ success: true, data: results });
});

module.exports = router;
module.exports.resetExpenses = resetExpenses;


