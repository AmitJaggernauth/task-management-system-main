/**
 * create-project.component.ts
 * Week 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Component for creating a new project
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="create-container">
      <h2 class="page-title">Create Project</h2>

      <form (ngSubmit)="onSubmit()" #projectForm="ngForm">
        <label>Project Name</label>
        <input type="text" name="name" [(ngModel)]="project.name" required />

        <label>Description</label>
        <textarea
          name="description"
          [(ngModel)]="project.description"
          required
        ></textarea>

        <button type="submit" class="submit-btn">Create Project</button>
      </form>
    </div>
  `,
  styles: [
    `
      .create-container {
        max-width: 480px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .page-title {
        font-family: var(--font-header);
        font-size: 1.6rem;
        color: var(--accent-dark);
      }

      label {
        font-family: var(--font-body);
        margin-top: 0.8rem;
      }

      input,
      textarea {
        width: 100%;
        padding: 0.6rem;
        border-radius: var(--radius-soft);
        border: 1px solid var(--accent-primary);
        font-family: var(--font-body);
      }

      .submit-btn {
        margin-top: 1rem;
        background: var(--accent-primary);
        color: var(--text-light);
        border: none;
        padding: 0.55rem 1.1rem;
        border-radius: var(--radius-soft);
        cursor: pointer;
        font-size: 0.85rem;
        font-family: var(--font-body);
      }

      .submit-btn:hover {
        background: var(--accent-secondary);
      }
    `,
  ],
})
export class CreateProjectComponent {
  project = {
    name: '',
    description: '',
  };

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {}

  onSubmit() {
    this.projectService.createProject(this.project).subscribe({
      next: () => {
        this.router.navigate(['/projects/list']);
      },
      error: (err) => {
        console.error('Error creating project', err);
      },
    });
  }
}
