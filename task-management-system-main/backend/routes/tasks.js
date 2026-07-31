/**
 * tasks.js
 * Weeks 1, 3 & 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Define routes for creating and listing tasks using an in-memory array.
 */

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, status, priority, dueDate, projectId } = req.body;

    if (!title || !status || !priority) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const task = await Task.create({
      title,
      status,
      priority,
      dueDate,
      projectId,
    });

    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating task",
    });
  }
});

// List all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
    });
  }
});

// Read a task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID format",
    });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({ success: true, data: updatedTask });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID format",
    });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid task by ID format",
    });
  }
});

module.exports = router;
