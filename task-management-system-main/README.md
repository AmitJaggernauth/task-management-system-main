# Task Management System (TMS)

## TMS – Week 1

This project is part of the BU Web Dev Bootcamp.  
Week 1 focuses on building the backend and frontend foundations for a Task Management System.

Week 1 Status - Completed.

## Backend

Backend folder structure
Express server setup
Tasks router
POST /tasks endpoint
GET /tasks endpoint
PUT /tasks/:id endpoint
Jest + Supertest installed
All backend tests passing

## Frontend

Angular project setup
Standalone routing (app.routes.ts)
TaskService with:

- getTasks()
- createTask()
- updateTask()
  - Components (inline HTML)
- CreateTaskComponent
- ListTaskComponent
- ReadTaskComponent
- UpdateTaskComponent

Jasmine/Karma test suite:

- 18 total tests
- 18 passing

Full CRUD functionality implemented

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

```
cd backend
npm test

Backend runs on:
http://localhost:3000

Angular app runs on:
http://localhost:4200

## How To Pull + Start Working

- git pull origin main
- cd backend
- npm install
- node server.js
```
