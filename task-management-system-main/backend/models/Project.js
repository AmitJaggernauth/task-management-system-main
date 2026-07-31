/**
 * Project.js
 * Week 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Mongoose model for Project documents
 */

const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", ProjectSchema);
