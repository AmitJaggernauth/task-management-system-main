/**
 * tasks.service.ts
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Service for managing task related operations
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  status: string;
  priority: string;
  dueDate?: string;
  projectId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService{
  private apiURL = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // GET all tasks
  getTasks(): Observable<{ success: boolean; data: Task[] }> {
    return this.http.get<{ success: boolean; data: Task[] }>(this.apiURL);
  }

  // POST create a new task
  createTask(task: Task): Observable<{ success: boolean; data: Task }> {
    return this.http.post<{ success: boolean; data: Task }>(this.apiURL, task);
  }

  // PUT update an existing task
  updateTask(task: Task): Observable<{ success: boolean; data: Task }> {
    return this.http.put<{ success: boolean; data: Task }>(
      `${this.apiURL}/${task.id}`,
      task,
    );
  }
}
