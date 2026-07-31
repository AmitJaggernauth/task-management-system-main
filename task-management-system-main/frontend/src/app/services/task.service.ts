/**
 * tasks.service.ts
 * Week 1, 2 & 3 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Service for managing task related operations
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  _id?: string;
  id?: string | number;
  title: string;
  status: string;
  priority: string;
  dueDate?: string;
  projectId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiURL = 'https://taskmgmntsys.onrender.com/tasks';

  constructor(private http: HttpClient) {}

  // GET all tasks
  getTasks(): Observable<{ success: boolean; data: Task[] }> {
    return this.http.get<{ success: boolean; data: Task[] }>(this.apiURL);
  }

  // POST create a new task
  createTask(task: Task): Observable<{ success: boolean; data: Task }> {
    return this.http.post<{ success: boolean; data: Task }>(this.apiURL, task);
  }

  /**
   * GET a single task by ID
   * Week 2 Requirement: Read Task by ID
   * Calls backend route: GET /tasks/:id
   */
  getTaskById(id: string): Observable<{ success: boolean; data: Task }> {
    return this.http.get<{ success: boolean; data: Task }>(
      `${this.apiURL}/${id}`,
    );
  }

  // PUT update an existing task
  updateTask(task: Task): Observable<{ success: boolean; data: Task }> {
    return this.http.put<{ success: boolean; data: Task }>(
      `${this.apiURL}/${task._id || task.id}`,
      task,
    );
  }

  /**
   * DELETE a task
   * Week 3 Requirement: Delete Task by ID
   */
  deleteTask(id: string | number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
