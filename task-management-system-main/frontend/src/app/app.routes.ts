/**
 * app.routes.ts
 * Weeks 1, 2 & 3 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Application routing configuration
 */

import { Routes } from '@angular/router';

// Task Components
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { ReadTaskComponent } from './tasks/read-task/read-task.component';
import { UpdateTaskComponent } from './tasks/update-task/update-task.component';
import { DeleteTaskComponent } from './tasks/delete-task/delete-task.component';

export const routes: Routes = [
  // Default route
  { path: '', redirectTo: 'tasks/list', pathMatch: 'full' },

  // Week 1 Route - Create Task
  {
    path: 'tasks/create',
    loadComponent: () =>
      import('./tasks/create-task/create-task.component').then(
        (m) => m.CreateTaskComponent,
      ),
  },

  // Week 1 Route - List Tasks
  {
    path: 'tasks/list',
    loadComponent: () =>
      import('./tasks/list-tasks/list-tasks.component').then(
        (m) => m.ListTasksComponent,
      ),
  },

  // Week 2 Route - Read Task by ID
  {
    path: 'tasks/read/:id',
    loadComponent: () =>
      import('./tasks/read-task/read-task.component').then(
        (m) => m.ReadTaskComponent,
      ),
  },

  // Week 2 Route - Update Task
  {
    path: 'tasks/update/:id',
    loadComponent: () =>
      import('./tasks/update-task/update-task.component').then(
        (m) => m.UpdateTaskComponent,
      ),
  },

  // Week 3 Route - Delete Task
  {
    path: 'tasks/delete/:id',
    loadComponent: () =>
      import('./tasks/delete-task/delete-task.component').then(
        (m) => m.DeleteTaskComponent,
      ),
  },

  // Week 4 Route - Create Project
  {
    path: 'projects/create',
    loadComponent: () =>
      import('./projects/create-project/create-project.component').then(
        (m) => m.CreateProjectComponent,
      ),
  },

  // fallback
  { path: '**', redirectTo: '/tasks/list' },
];
