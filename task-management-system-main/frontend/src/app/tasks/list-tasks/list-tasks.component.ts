/**
 * list-task.component.ts
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Component responsible for retrieving and displaying all tasks
 */

import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-list-tasks',
  template: `
    <div class="task-list">
      <h2>All Tasks</h2>

      <!-- Display a fallback message when no tasks exist -->
      <div *ngIf="tasks.length === 0">No tasks found.</div>

      <!-- Render each task returned from the backend -->
      <ul>
        <li *ngFor="let task of tasks">
          <strong>{{ task.title }}</strong> — {{ task.status }} —
          {{ task.priority }}
        </li>
      </ul>
    </div>
  `,
})
export class ListTasksComponent implements OnInit {
  // Local array to store tasks fetched from the backend
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  // Lifecycle hook: runs once when the component loads
  ngOnInit() {
    // Fetch all tasks from the backend API
    this.taskService.getTasks().subscribe({
      next: (res) => {
        // Store the returned tasks so the template can render them
        this.tasks = res.data;
      },
      error: (err) => {
        // Log any errors from the API
        console.error('Error fetching tasks:', err);
      },
    });
  }
}
