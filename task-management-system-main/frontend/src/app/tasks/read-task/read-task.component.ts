/**
 * read-task.component.ts
 * Week 1, 2 & 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Component for retrieving and displaying a single task by ID
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-read-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="task-details-container">
      <h2 class="page-title">Task Details</h2>

      <!-- Error message -->
      <div *ngIf="error" class="error-card">{{ error }}</div>

      <!-- Show a message if task not found -->
      <div *ngIf="!task && !error" class="error-card">Task not found.</div>

      <!-- Task details card -->
      <div *ngIf="task" class="task-card">
        <div class="task-title">{{ task.title }}</div>

        <div class="task-meta">
          <p><strong>Status:</strong> {{ task.status }}</p>
          <p><strong>Priority:</strong> {{ task.priority }}</p>

          <!-- Optional fields -->
          <p *ngIf="task.dueDate">
            <strong>Due Date:</strong> {{ task.dueDate }}
          </p>
          <p *ngIf="task.projectId">
            <strong>Project ID:</strong> {{ task.projectId }}
          </p>
        </div>

        <button class="back-btn" routerLink="/tasks/list">Back to Tasks</button>
      </div>
    </div>
  `,
  styles: [
    `
      .task-details-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .page-title {
        font-family: var(--font-header);
        font-size: 1.6rem;
        color: var(--accent-dark);
        margin-bottom: 0.5rem;
      }

      /* ---------- Cards ---------- */
      .error-card {
        border-left: 6px solid var(--accent-warm);
      }
      .task-card {
        background: var(--bg-card);
        padding: 1.2rem 1.4rem;
        border-radius: var(--radius-soft);
        box-shadow: var(--shadow-soft);
        border-left: 6px solid var(--accent-primary);
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        max-width: 480px;
      }

      /* ---------- Task Info ---------- */
      .task-title {
        font-family: var(--font-header);
        font-size: 1.4rem;
        color: var(--accent-dark);
        letter-spacing: -0.3px;
      }

      .task-meta {
        font-family: var(--font-body);
        font-size: 0.95rem;
        color: var(--text-muted);
        line-height: 1.5;
      }

      /* ---------- Back Button ---------- */
      .back-btn {
        background: var(--accent-primary);
        width: fit-content;
      }

      .back-btn:hover {
        background: var(--accent-secondary);
      }
    `,
  ],
})
export class ReadTaskComponent implements OnInit {
  // Holds the task retrieved from the backend
  task: Task | undefined;

  // Holds error messages from the backend
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

    /**
     * Week 2 Requirement:
     * Call GET /tasks/:id instead of fetching all tasks
     */
    this.taskService.getTaskById(id).subscribe({
      next: (res) => {
        this.task = res.data;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error fetching task';
      },
    });
  }
}
