/**
 * delete-task.component.ts
 * Week 3 & 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Component for confirming and deleting a task by ID
 * (originally incorporated in List Component via oversight - corrected here)
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="delete-container">
      <h2 class="page-title">Delete Task</h2>

      <!-- Error -->
      <div *ngIf="error" class="error-card">{{ error }}</div>

      <!-- Loading -->
      <div *ngIf="!task && !error" class="loading-card">Loading task...</div>

      <!-- Confirmation -->
      <div *ngIf="task" class="delete-card">
        <p class="warning-text">Are you sure you want to delete this task?</p>

        <div class="task-preview">
          <p><strong>Title:</strong> {{ task.title }}</p>
          <p><strong>Status:</strong> {{ task.status }}</p>
          <p><strong>Priority:</strong> {{ task.priority }}</p>
        </div>

        <div class="button-row">
          <button class="delete-btn" (click)="onDelete()">Delete</button>
          <button class="cancel-btn" routerLink="/tasks/list">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .delete-container {
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

      .delete-card {
        background: var(--bg-card);
        padding: 1.2rem 1.4rem;
        border-radius: var(--radius-soft);
        box-shadow: var(--shadow-soft);
        border-left: 6px solid var(--accent-primary);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .warning-text {
        font-family: var(--font-body);
        font-size: 1rem;
        color: var(--accent-dark);
      }

      .task-preview p {
        margin: 0.2rem 0;
        font-family: var(--font-body);
      }

      .button-row {
        display: flex;
        gap: 0.6rem;
        margin-top: 0.5rem;
      }
    `,
  ],
})
export class DeleteTaskComponent implements OnInit {
  task: Task | undefined;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Invalid task ID';
      return;
    }

    this.taskService.getTaskById(id).subscribe({
      next: (res) => {
        this.task = res.data;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error fetching task';
      },
    });
  }

  onDelete() {
    if (!this.task) return;

    // Safely resolve ID
    const id = this.task._id ?? this.task.id;

    // if neither exists, stop and avoid a crash
    if (!id) {
      this.error = 'Task has no valid ID - cannot delete.';
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.router.navigate(['/tasks/list']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error deleting task';
      },
    });
  }
}
