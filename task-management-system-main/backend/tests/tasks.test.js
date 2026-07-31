/**
 * tasks.test.js
 * Weeks 1, 2 & 3 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Test cases for task management functionality
 */

const request = require("supertest");
const express = require("express");
const router = require("../routes/tasks");
const resetTasks = router.resetTasks;

// Create an app instance that uses your tasks router
const app = express();
app.use(express.json());
app.use("/tasks", router);

// reset tasks before each test to ensure a clean state
beforeEach(() => {
  resetTasks();
});

// POST tests, 3 total, 1 for required fields, 1 for missing required fields, 1 for optional fields
describe("POST /tasks", () => {
  it("should create a new task when required fields are provided", async () => {
    const response = await request(app).post("/tasks").send({
      // required fields
      title: "Test Task",
      status: "Pending",
      priority: "High",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.title).toBe("Test Task");
    expect(response.body.data.status).toBe("Pending");
    expect(response.body.data.priority).toBe("High");
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/tasks").send({
      // title missing
      status: "In Progress",
      priority: "High",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Missing required fields");
  });

  it("should accept optional fields dueDate and projectId", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Task with optional extras",
      status: "Pending",
      priority: "Low",
      // adding optional fields
      dueDate: "2026-07-13",
      projectId: "P123",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.dueDate).toBe("2026-07-13");
    expect(response.body.data.projectId).toBe("P123");
  });
});

// GET tests,
describe("GET /tasks", () => {
  it("should return an empty array initially", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(0);
  });

  it("should return all created tasks", async () => {
    // Create two tasks first
    await request(app).post("/tasks").send({
      title: "Task One",
      status: "Pending",
      priority: "High",
    });

    await request(app).post("/tasks").send({
      title: "Task Two",
      status: "In Progress",
      priority: "Low",
    });

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThanOrEqual(2);

    const titles = response.body.data.map((t) => t.title);
    expect(titles).toContain("Task One");
    expect(titles).toContain("Task Two");
  });

  it("should always return success: true", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

describe("DELETE /tasks/:id", () => {
  // Create a task before each test so there is something to delete
  let createdTaskId;

  beforeEach(async () => {
    resetTasks(); // ensure a clean slate

    // Create a task to delete
    const response = await request(app).post("/tasks").send({
      title: "Task to Delete",
      status: "Pending",
      priority: "Low",
    });

    // Store the ID for later use
    createdTaskId = response.body.data.id;
  });

  it("should delete an existing task", async () => {
    const response = await request(app).delete(`/tasks/${createdTaskId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Task deleted successfully");

    const getResponse = await request(app).get("/tasks");
    const titles = getResponse.body.data.map((t) => t.title);

    expect(titles).not.toContain("Task to Delete");
  });

  it("should return 404 if the task does not exist", async () => {
    // use a fake ID that won't exist
    const response = await request(app).delete("/tasks/9999");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Task not found");
  });

  it("should return 400 for an invalid ID format", async () => {
    // invalid ID format (string instead of number)
    const response = await request(app).delete("/tasks/not-a-valid-id");

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid task ID format");
  });
});
