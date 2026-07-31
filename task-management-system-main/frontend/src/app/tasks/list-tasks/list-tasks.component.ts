/**
 * list-task.component.ts
 * Weeks 1, 3 & 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Component responsible for retrieving, displaying and deleting tasks
 */

import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { NgIf, NgForOf, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, RouterLink],
  template: `
    <div class="task-list">
      <!-- Section Header -->
      <h2>All Tasks</h2>

      <!-- Empty State when no tasks exist -->
      <div *ngIf="tasks.length === 0" class="empty-state">
        <div class="empty-icon">✶</div>
        <div class="empty-title">No tasks yet.</div>
        <div class="empty-message">
          Start by creating a task to track your work, deadlines, and
          priorities.
        </div>
        <button class="empty-cta" routerLink="/tasks/create">
          Create your first task
        </button>
      </div>

      <!-- Render each task as a hybrid list-card -->
      <div *ngFor="let task of tasks" class="task-card">
        <!-- Left side: Title + metadata -->
        <div class="task-info">
          <!-- Task title using Fraunces -->
          <div class="task-title">
            {{ task.title }}
          </div>

          <!-- Task metadata using Sono -->
          <div class="task-meta">
            Status: {{ task.status }} ✶ Priority: {{ task.priority }}
          </div>
        </div>

        <!-- Middle: Status badge -->
        <div class="task-status">
          <span
            class="status-badge"
            [ngClass]="{
              'status-not-started': task.status === 'Not Started',
              'status-in-progress': task.status === 'In Progress',
              'status-completed': task.status === 'Completed',
            }"
          >
            {{ task.status }}
          </span>
        </div>

        <!-- Right side: Action buttons -->
        <div class="task-actions">
          <!-- Delete button -->
          <button [routerLink]="['/tasks/delete', task._id]" class="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .task-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      /* ---------- Empty State ---------- */
      .empty-state {
        background: var(--bg-card);
        padding: 2rem;
        border-radius: var(--radius-round);
        box-shadow: var(--shadow-medium);
        border-left: 6px solid var(--accent-primary);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .empty-icon {
        font-size: 1.6rem;
        color: var(--accent-primary);
        opacity: 0.9;
      }

      .empty-title {
        font-family: var(--font-header);
        font-size: 1.5rem;
        color: var(--accent-dark);
        letter-spacing: -0.4px;
      }

      .empty-message {
        font-family: var(--font-body);
        font-size: 1rem;
        color: var(--text-muted);
        max-width: 420px;
        line-height: 1.55;
      }

      .empty-cta {
        margin-top: 0.5rem;
        background: var(--accent-secondary);
        color: var(--text-light);
        border: none;
        padding: 0.65rem 1.2rem;
        border-radius: var(--radius-soft);
        cursor: pointer;
        font-size: 0.9rem;
        font-family: var(--font-body);
        transition:
          background 0.2s ease,
          transform 0.1s ease;
      }

      .empty-cta:hover {
        background: var(--accent-dark);
        transform: translateY(-1px);
      }

      /* ---------- Task Card ---------- */
      .task-card {
        background: var(--bg-card);
        padding: 1.4rem 1.6rem;
        border-radius: var(--radius-round);
        box-shadow: var(--shadow-soft);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-left: 6px solid var(--accent-primary);
        transition:
          transform 0.15s ease,
          box-shadow 0.15s ease;
      }

      .task-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-medium);
      }

      /* ---------- Task Info ---------- */
      .task-info {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }

      .task-title {
        font-family: var(--font-header);
        font-size: 1.3rem;
        color: var(--accent-dark);
        letter-spacing: -0.3px;
      }

      .task-meta {
        font-family: var(--font-body);
        font-size: 0.95rem;
        color: var(--text-muted);
      }

      .task-status {
        margin-right: 1rem;
      }

      .task-actions {
        display: flex;
        gap: 0.6rem;
      }

      /* ---------- Delete Button override ---------- */
      .delete-btn {
        background: var(--accent-warm);
      }

      .delete-btn:hover {
        background: var(--accent-dark);
      }
    `,
  ],
})
export class ListTasksComponent implements OnInit {
  // Local array to store tasks fetched from the backend
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  // Lifecycle hook: runs once when the component loads
  ngOnInit() {
    this.getTasks(); // load tasks on component init
  }

  /**
   * Fetch all tasks from the backend API
   */
  getTasks() {
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
