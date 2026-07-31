/**
 * create-project.component.spec.ts
 * Week 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Unit tests for CreateProjectComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProjectComponent } from './create-project.component';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;
  let mockService: jasmine.SpyObj<ProjectService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ProjectService', ['createProject']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CreateProjectComponent],
      providers: [
        { provide: ProjectService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
  });

  /**
   * Test 1 - Component should be created
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test 2 - Should call createProject() on submit
   */
  it('should call createProject on submit', () => {
    component.project = {
      name: 'New Project',
      description: 'Test description',
    };

    mockService.createProject.and.returnValue(of({ success: true }));

    component.onSubmit();

    expect(mockService.createProject).toHaveBeenCalledWith({
      name: 'New Project',
      description: 'Test description',
    });
  });

  /**
   * Test 3 - Should navigate after successful creation
   */
  it('should navigate after project creation', () => {
    mockService.createProject.and.returnValue(of({ success: true }));

    component.onSubmit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/projects/list']);
  });
});
