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

/* 
   UPDATE TASK
*/
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const { title, status, priority, dueDate, projectId } = req.body;

  // Apply updates only if provided
  if (title !== undefined) task.title = title;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (projectId !== undefined) task.projectId = projectId;

  res.json({ success: true, data: task });
});

/* 
   SEARCH TASKS
 */
router.get("/search/query", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const results = tasks.filter((t) =>
    t.title.toLowerCase().includes(q)
  );

  res.json({ success: true, data: results });
});

module.exports = router;
module.exports.resetTasks = resetTasks; // Export reset function for testing
