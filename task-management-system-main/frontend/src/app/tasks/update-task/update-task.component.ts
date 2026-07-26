/**
 * update-task.component.ts
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Component for retrieving a task by ID and updating it
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="update-task">
      <h2>Update Task</h2>

      <!-- Show a message if no task was found -->
      <div *ngIf="!task">Task not found.</div>

      <!-- Update form -->
      <form *ngIf="task" (ngSubmit)="onSubmit()">
        <label>
          Title:
          <input [(ngModel)]="task.title" name="title" />
        </label>

        <label>
          Status:
          <input [(ngModel)]="task.status" name="status" />
        </label>

        <label>
          Priority:
          <input [(ngModel)]="task.priority" name="priority" />
        </label>

        <button type="submit">Update Task</button>
      </form>
    </div>
  `,
})
export class UpdateTaskComponent implements OnInit {
  // Holds the task retrieved from the backend
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {}

  // Lifecycle hook: runs once when the component loads
  ngOnInit() {
    // Extract the ID from the route parameters
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch all tasks from the backend API
    this.taskService.getTasks().subscribe({
      next: (res) => {
        // Find the task with the matching ID
        this.task = res.data.find((t) => t.id === id);
      },
      error: (err) => {
        console.error('Error fetching task:', err);
      },
    });
  }

  // Submit updated task to the backend
  onSubmit() {
    if (!this.task) return;

    this.taskService.updateTask(this.task).subscribe({
      next: (res) => {
        console.log('Task updated:', res.data);
      },
      error: (err) => {
        console.error('Error updating task:', err);
      },
    });
  }
}
