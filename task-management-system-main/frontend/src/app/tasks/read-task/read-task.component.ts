/**
 * read-task.component.ts
 * Week 1 - Task Management System
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
    <div class="task-details">
      <h2>Task Details</h2>

      <!-- Show a message if no task was found -->
      <div *ngIf="!task">Task not found.</div>

      <!-- Display the selected task -->
      <div *ngIf="task">
        <p><strong>Title:</strong> {{ task.title }}</p>
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
    </div>
  `,
})
export class ReadTaskComponent implements OnInit {
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
}
