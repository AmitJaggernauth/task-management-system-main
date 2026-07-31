/**
 * app.component.ts
 * Weeks 1-3 - Task Management System
 * Author: Niki Nielsen
 * Purpose: Root component with Navigation for sprint features
 */

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgClass } from '../../node_modules/@angular/common/index';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1 class="app-title">Hello, frontend-app</h1>
    <nav class="main-nav">
      <a routerLink="/tasks/list">✶ List Tasks ✶</a>
      <a routerLink="/tasks/create">✶ Create Task ✶</a>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'frontend-app';
}
