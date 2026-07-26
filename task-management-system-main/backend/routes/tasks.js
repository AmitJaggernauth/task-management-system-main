/**
 * tasks.js
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Define routes for creating and listing tasks using an in-memory array.
 */

const express = require("express");
const router = express.Router();

let tasks = []; // Temporary in-memory storage for Week 1

// reset tasks
function resetTasks() {
  tasks = [];
}

// Create a new task
router.post("/", (req, res) => {
  const { title, status, priority, dueDate, projectId } = req.body;

  // Basic validation required for Week 1
  if (!title || !status || !priority) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  // Build task object with incremental ID
  const task = {
    id: tasks.length + 1,
    title,
    status,
    priority,
    dueDate,
    projectId,
  };

  tasks.push(task); // Store task in memory
  res.status(201).json({ success: true, data: task });
});

// List all tasks
router.get("/", (req, res) => {
  res.json({ success: true, data: tasks });
});

module.exports = router;
module.exports.resetTasks = resetTasks; // Export reset function for testing
