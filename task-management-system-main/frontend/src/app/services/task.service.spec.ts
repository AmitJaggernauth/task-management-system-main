/**
 * task.service.spec.ts
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Unit tests for the TaskService
 */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService, Task } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Configure testing module with HttpClient mock tools
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    // Inject the service and the HTTP testing controller
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Ensure no outstanding HTTP requests linger after each test
  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Test 1 - GET /tasks should retrieve all tasks
   */
  it('should retrieve tasks via GET', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task One', status: 'Pending', priority: 'High' },
    ];

    // Subscribe to the service call
    service.getTasks().subscribe((response) => {
      expect(response.success).toBe(true);
      expect(response.data.length).toBe(1);
      expect(response.data[0].title).toBe('Task One');
    });

    // Expect a GET request to the correct URL
    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush({ success: true, data: mockTasks });
  });

  /**
   * Test 2 - POST /tasks should create a new task
   */
  it('should create a task via POST', () => {
    const newTask: Task = {
      id: 1,
      title: 'New Task',
      status: 'Pending',
      priority: 'Low',
    };

    // Subscribe to the service call
    service.createTask(newTask).subscribe((response) => {
      expect(response.success).toBe(true);
      expect(response.data.title).toBe('New Task');
    });

    // Expect a POST request to the correct URL
    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('POST');

    // Respond with mock data including generated ID
    req.flush({ success: true, data: { ...newTask, id: 1 } });
  });

  /**
   * Test 3 - Ensure the service calls the correct API url
   */
  it('should call the correct API URL', () => {
    // Trigger a GET request
    service.getTasks().subscribe();

    // Expect the correct URL
    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.url).toBe('http://localhost:3000/tasks');

    // Respond with empty data
    req.flush({ success: true, data: [] });
  });
});
