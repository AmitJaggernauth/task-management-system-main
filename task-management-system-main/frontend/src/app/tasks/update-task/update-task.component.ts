/**
 * update-task.component.ts
 * Week 1, 2 & Week 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Component for retrieving a task by ID and updating it
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="update-container">
      <h2 class="page-title">Update Task</h2>

      <!-- Error message -->
      <div *ngIf="error" class="error-card">
        {{ error }}
      </div>

      <!-- Loading state -->
      <div *ngIf="!task && !error" class="loading-card">Loading task...</div>

      <!-- Update form -->
      <form *ngIf="task" (ngSubmit)="onSubmit()" class="update-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            [(ngModel)]="task.title"
            name="title"
            required
          />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" [(ngModel)]="task.status" name="status" required>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div class="form-group">
          <label for="priority">Priority</label>
          <select
            id="priority"
            [(ngModel)]="task.priority"
            name="priority"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <!-- Optional Fields -->
        <div class="form-group">
          <label for="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            [(ngModel)]="task.dueDate"
            name="dueDate"
          />
        </div>

        <div class="form-group">
          <label for="projectId">Project ID</label>
          <input
            id="projectId"
            type="text"
            [(ngModel)]="task.projectId"
            name="projectId"
          />
        </div>

        <div class="button-row">
          <button type="submit" class="save-btn">Save Changes</button>
          <button routerLink="/tasks/list" class="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .update-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        max-width: 480px;
      }

      .page-title {
        font-family: var(--font-header);
        font-size: 1.6rem;
        color: var(--accent-dark);
        margin-bottom: 0.5rem;
      }

      /* ---------- Cards ---------- */
      .error-card,
      .loading-card {
        border-left: 6px solid var(--accent-warm);
      }

      .update-form {
        background: var(--bg-card);
        padding: 1.2rem 1.4rem;
        border-radius: var(--radius-soft);
        box-shadow: var(--shadow-soft);
        border-left: 6px solid var(--accent-primary);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      /* ---------- Form Layout ---------- */
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }

      label {
        font-family: var(--font-body);
        font-size: 0.9rem;
        color: var(--accent-dark);
      }

      /* ---------- Buttons ---------- */
      .button-row {
        display: flex;
        gap: 0.6rem;
        margin-top: 0.5rem;
      }

      .save-btn {
        background: var(--accent-primary);
      }

      .save-btn:hover {
        background: var(--accent-secondary);
      }

      .cancel-btn {
        background: var(--accent-warm);
      }

      .cancel-btn:hover {
        background: var(--accent-dark);
      }
    `,
  ],
})
export class UpdateTaskComponent implements OnInit {
  // Holds the task retrieved from the backend
  task: Task | undefined;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {}

  // Lifecycle hook: runs once when the component loads
  ngOnInit() {
    // Extract the ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Invalid task ID';
      return;
    }

    // Find the task with the matching ID
    this.taskService.getTaskById(id).subscribe({
      next: (res) => {
        this.task = res.data;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error fetching task';
      },
    });
  }

  // Submit updated task to the backend
  onSubmit() {
    if (!this.task) return;

    this.taskService.updateTask(this.task).subscribe({
      next: () => {},
      error: (err) => {
        this.error = err.error?.message || 'Error updating task';
      },
    });
  }
}
