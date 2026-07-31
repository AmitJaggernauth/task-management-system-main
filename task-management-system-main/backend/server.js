/**
 * server.js
 * Week 1 & 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Initializes Express server and mounts task routes
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const tasksRouter = require("./routes/tasks");
const projectRoutes = require("./routes/projects");

// Mount routes
app.use("/tasks", tasksRouter);
app.use("/api/projects", projectRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Task Management System API is running");
});

// Add mongoose connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // Start server ONLY after DB connects
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
