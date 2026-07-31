# Task Management System (TMS)

## Overview

This project is part of the BU Web Dev Bootcamp. It is a full-stack MEAN application (MongoDB, Express, Angular, Node) that implements CRUD operations for task management.

This repository contains all Week 1 work, completed Week 2 Student A responsibilities, Week 3 UI enhancements, and Week 4 stabilization and testing.

---

# Week 4 Status - Completed

## Backend (Node + Express + MongoDB)

- Updated Mongoose schema (made optional fields truly optional; aligned with Angular model).
- Improved error handling for Invalid ObjectIds and missing fields.
- Verified full CRUD stability using REST Client (POST, GET, GET/:id, PUT/:id, DELETE/:id).
- Standardized backend responses for consistent frontend consumption.

## Frontend (Angular)

- Finalized routing: /tasks/create, /tasks/read/:id, /tasks/edit/:id.
- Updated TaskService to ensure all CRUD methods match backend schema.
- Synced Create, Read, and Update components with backend field names.
- Re-tested components after schema changes: all Jasmine/Karma tests passing.
- Improved navigation flow and UI consistency.

## Issues & Resolutions

- 500 errors due to required fields -> updated schema + retested.
- Invalid ObjectId errors -> added backend validation.
- Frontend receiving mismatched fields -> updated TaskService + components.
- REST Client failures -> resolved after schema alignment.

### Week 4 Summary: Stabilized full CRUD functionality, resolved environment-specific issues, and prepared the project for deployment.

## Note: Update functionality (PUT /tasks/:id and UpdateTaskComponent) was assigned to Student B and is not part of Student A's required deliverables.

---

## Week 3 Status - Completed (Student A Enhancements)

### Frontend

- CreateTaskComponent UI redesign (centered layout, header, improved styling).
- Modal added after task creation (stable + tested).
- Routing refinements for smoother navigation.
- Updated Jasmine/Karma tests to reflect optional fields (22/22 passing).

---

## Week 2 Status - Completed (Student A Work)

### Backend

- Added GET /tasks/:id with error handling for invalid/missing IDs.

### Frontend

- Implemented ReadTaskComponent (route param extraction, backend call, error handling).
- Added /tasks/read/:id route
- Jasmine/Karma tests for ReadTaskComponent (component creation, service call, error handling).

---

## Week 1 Status - Completed

### Backend

- Express server setup + Tasks Router
- POST /tasks, GET /tasks, PUT /tasks/:id (Week 1 version).
- In-memory task storage.
- Jest + Supertest installed; all tests passing.

### Frontend

- Angular project setup + standalone routing.
- TaskService: getTasks(), createTask(), updateTask() (Week 1 version).
- Components: Create, List, Read, Update (inline templates).
- Jasmine/Karma: 18/18 tests passing.
  Full Week1 CRUD functionality implemented.

### Project Structure

/backend - Node.js + Express API
/frontend - Angular application

### How to Run

```
cd backend
npm install
npm start
```

cd frontend
npm install
ng serve

### How to Run Backend Tests

cd backend
npm test

Backend: http://localhost:3000

Frontend: http://localhost:4200

---

## Notes

This README reflects the current state of the repository through Week 4.
