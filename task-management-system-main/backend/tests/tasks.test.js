/**
 * tasks.test.js
 * Week 1 - Task Management System
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

/* 
   WEEK 2 - UPDATE TASK 
*/
describe("PUT /tasks/:id", () => {
  it("should update a task when valid fields are provided", async () => {
    await request(app).post("/tasks").send({
      title: "Original",
      status: "Pending",
      priority: "Low",
    });

    const response = await request(app)
      .put("/tasks/1")
      .send({ title: "Updated Title", priority: "High" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Updated Title");
    expect(response.body.data.priority).toBe("High");
  });

  it("should return 404 if task does not exist", async () => {
    const response = await request(app)
      .put("/tasks/999")
      .send({ title: "Doesn't matter" });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Task not found");
  });

  it("should allow partial updates", async () => {
    await request(app).post("/tasks").send({
      title: "Partial",
      status: "Pending",
      priority: "Low",
    });

    const response = await request(app)
      .put("/tasks/1")
      .send({ status: "In Progress" });

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe("In Progress");
  });
});

/* 
   WEEK 3 - SEARCH TASKS
*/
describe("GET /tasks/search/query?q=", () => {
  beforeEach(async () => {
    await request(app).post("/tasks").send({
      title: "Fix login bug",
      status: "Pending",
      priority: "High",
    });

    await request(app).post("/tasks").send({
      title: "Write documentation",
      status: "In Progress",
      priority: "Medium",
    });

    await request(app).post("/tasks").send({
      title: "Deploy to production",
      status: "Completed",
      priority: "High",
    });
  });

  it("should return tasks matching the search query", async () => {
    const response = await request(app).get(
      "/tasks/search/query?q=fix"
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].title).toBe("Fix login bug");
  });

  it("should return multiple matches", async () => {
    const response = await request(app).get(
      "/tasks/search/query?q=to"
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
  });

  it("should return an empty array if no matches found", async () => {
    const response = await request(app).get(
      "/tasks/search/query?q=xyz"
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
  });
});
