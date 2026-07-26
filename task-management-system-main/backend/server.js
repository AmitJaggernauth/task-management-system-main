/**
 * server.js
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Initializes Express server and mounts task routes
 */

const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");

app.use(express.json()); // Parse JSON request bodies

// Mount task routes under /tasks path
app.use("/tasks", tasksRouter);

// Simple root route to confirm server is running
app.get("/", (req, res) => {
  res.send("Task Management System API is running");
});

const PORT = process.env.PORT || 3000;

// Start server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
