/**
 * create-task.component.ts
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Component for creating a new task
 */

import { Component } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- Simple task creation form using Angular's template-driven forms -->
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
  `,
})
export class CreateTaskComponent {
  // Local task model bound to the form inputs
  task: Task = {
    title: '',
    status: '',
    priority: '',
  };

  constructor(private taskService: TaskService) {}

  // Called when the form is submitted
  onSubmit() {
    // Send the task to the backend API via TaskService
    this.taskService.createTask(this.task).subscribe({
      next: (res) => {
        // Log the created task for debugging and confirmation
        console.log('Task created:', res.data);
      },
      error: (err) => {
        // Log any errors from the API
        console.error('Error creating task:', err);
      },
    });
  }
}
