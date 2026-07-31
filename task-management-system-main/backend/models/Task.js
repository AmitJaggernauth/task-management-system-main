/**
 * Task.js
 * Week 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Mongoose model for Tasks
 */

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    dueDate: { type: String },
    project: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", TaskSchema);
