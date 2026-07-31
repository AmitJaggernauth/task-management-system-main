/**
 * create-task.component.ts
 * Weeks 1 & 3 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Component for creating a new task
 */

import { Component } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  template: `
    <!-- Create Task Card -->
    <div class="form-card">
      <h2 class="form-header">Create a New Task</h2>

      <form (ngSubmit)="onSubmit()" #taskForm="ngForm" class="form-container">
        <!-- Required fields -->
        <label>Title</label>
        <input name="title" [(ngModel)]="task.title" required />

        <label>Status</label>
        <input name="status" [(ngModel)]="task.status" required />

        <label>Priority</label>
        <input name="priority" [(ngModel)]="task.priority" required />

        <!-- Optional fields -->
        <label>Due Date (optional)</label>
        <input name="dueDate" [(ngModel)]="task.dueDate" />

        <label>Project ID (optional)</label>
        <input name="projectId" [(ngModel)]="task.projectId" />

        <button type="submit">Create Task</button>
      </form>
    </div>

    <!-- Success Modal Overlay -->
    <div *ngIf="showModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-icon">✶</div>

        <div class="modal-title">Task Created!</div>

        <div class="modal-message">
          Your task <strong>{{ createdTaskTitle }}</strong> was added
          successfully.
        </div>

        <div class="modal-actions">
          <button class="modal-btn" routerLink="/tasks/list">View Tasks</button>
          <button class="modal-btn secondary" (click)="showModal = false">
            Close
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* ---------- Form Card ---------- */
      .form-card {
        background: var(--accent-primary);
        padding: 2rem;
        border-radius: var(--radius-soft);
        box-shadow: var(--shadow-medium);
        width: 540px;
        margin: 3rem auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      /* ---------- Header ---------- */
      .form-header {
        font-family: var(--font-header);
        font-size: 1.6rem;
        color: var(--text-main);
        margin: 0;
        text-align: center;
      }

      /* ---------- Form Layout ---------- */
      .form-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      /* ---------- Label ---------- */
      .form-container label {
        font-family: var(--font-header);
        font-size: 1rem;
        color: var(--text-muted);
      }

      /* ---------- Input Overrides ---------- */
      .form-container input {
        background: var(--bg-card);
        border: 1px solid var(--accent-dark);
        color: var(--accent-dark);
      }

      /* ---------- Submit Button Override ---------- */
      .form-container button[type='submit'] {
        background: var(--accent-secondary);
      }

      .form-container button[type='submit']:hover {
        background: var(--accent-dark);
      }

      /* ---------- Modal Overlay ---------- */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      /* ---------- Modal Card ---------- */
      .modal-card {
        background: var(--bg-card);
        padding: 2rem;
        border-radius: var(--radius-soft);
        box-shadow: var(--shadow-medium);
        border-left: 6px solid var(--accent-primary);
        width: 380px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      /* ---------- Modal Content ---------- */
      .modal-icon {
        font-size: 1.8rem;
        color: var(--accent-primary);
        opacity: 0.9;
      }

      .modal-title {
        font-family: var(--font-header);
        font-size: 1.4rem;
        color: var(--accent-dark);
        letter-spacing: -0.4px;
      }

      .modal-message {
        font-family: var(--font-body);
        font-size: 1rem;
        color: var(--text-muted);
        line-height: 1.5;
      }

      /* ---------- Modal Actions ---------- */
      .modal-actions {
        display: flex;
        gap: 0.8rem;
        margin-top: 0.5rem;
      }

      /* ---------- Modal Button Overrides ---------- */
      .modal-btn {
        background: var(--accent-primary);
      }

      .modal-btn:hover {
        background: var(--accent-secondary);
      }

      .modal-btn.secondary {
        background: var(--accent-warm);
      }

      .modal-btn.secondary:hover {
        background: var(--accent-dark);
      }
    `,
  ],
})
export class CreateTaskComponent {
  // Local task model bound to the form inputs
  task: Task = {
    id: 0,
    title: '',
    status: '',
    priority: '',
    dueDate: '',
    projectId: '',
  };

  showModal = false;
  createdTaskTitle = '';

  constructor(private taskService: TaskService) {}

  // Called when the form is submitted
  onSubmit() {
    // Send the task to the backend API via TaskService
    this.taskService.createTask(this.task).subscribe({
      next: (res) => {
        // Log the created task for debugging and confirmation
        console.log('Task created:', res.data);

        this.createdTaskTitle = res.data.title;
        this.showModal = true;

        // reset form fields
        this.task = {
          id: 0,
          title: '',
          status: '',
          priority: '',
          dueDate: '',
          projectId: '',
        };
      },
      error: (err) => {
        // Log any errors from the API
        console.error('Error creating task:', err);
      },
    });
  }
}
