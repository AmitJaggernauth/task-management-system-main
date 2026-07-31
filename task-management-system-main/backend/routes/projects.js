/**
 * projects.js
 * Weeks 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: API routes for creating projects
 */

const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// POST /projects - Create a new project
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const newProject = await Project.create({ name, description });

    res.json({ success: true, data: newProject });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({
      success: false,
      message: "Error creating project",
    });
  }
});

module.exports = router;
