/**
 * project.service.ts
 * Week 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Service for creating projects
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}

  createProject(project: Partial<Project>): Observable<any> {
    return this.http.post(this.apiUrl, project);
  }
}
