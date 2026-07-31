/**
 * projects.test.js
 * Author: Nicole Nielsen
 * Purpose: Unit tests for Project creation API
 */

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const projectRoutes = require("../routes/projects");
const Project = require("../models/Project");

const app = express();
app.use(express.json());
app.use("/api/projects", projectRoutes);

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/task_management_test");
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("POST /api/projects", () => {
  /**
   * Test 1 - Should create a project successfully
   */
  it("should create a new project", async () => {
    const res = await request(app).post("/api/projects").send({
      name: "New Project",
      description: "This is a test project",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("New Project");
  });

  /**
   * Test 2 - Should return success and project data
   */
  it("should return project data in response", async () => {
    const res = await request(app).post("/api/projects").send({
      name: "Another Project",
      description: "Project description",
    });

    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("description");
  });

  /**
   * Test 3 - Should handle errors (missing fields)
   */
  it("should return an error when required fields are missing", async () => {
    const res = await request(app).post("/api/projects").send({
      name: "",
      description: "",
    });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Error creating project");
  });
});
