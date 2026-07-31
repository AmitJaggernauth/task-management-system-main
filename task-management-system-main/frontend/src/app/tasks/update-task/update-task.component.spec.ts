/**
 * update-task.component.spec.ts
 * Week 1 & 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Unit tests for the UpdateTaskComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task.component';
import { TaskService, Task } from '../../services/task.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;
  let mockService: jasmine.SpyObj<TaskService>;
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('TaskService', [
      'getTaskById',
      'updateTask',
    ]);

    mockService.getTaskById.and.returnValue(
      of({
        success: true,
        data: {
          id: 1,
          title: 'Task One',
          status: 'Not Started',
          priority: 'High',
        },
      }),
    );

    mockRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    });

    TestBed.configureTestingModule({
      imports: [FormsModule, UpdateTaskComponent, RouterTestingModule],
      providers: [
        { provide: TaskService, useValue: mockService },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    });

    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test 1 — Component should be created successfully
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test 2 — getTaskById() should be called on initialization
   */
  it('should call getTaskById on init', () => {
    component.ngOnInit();
    expect(mockService.getTaskById).toHaveBeenCalledWith('1');
  });

  /**
   * Test 3 — updateTask() should be called on submit
   */
  it('should call updateTask on submit', () => {
    mockService.updateTask.and.returnValue(
      of({
        success: true,
        data: {
          id: 1,
          title: 'Task One',
          status: 'Not Started',
          priority: 'High',
        },
      }),
    );

    component.ngOnInit();
    component.onSubmit();

    expect(mockService.updateTask).toHaveBeenCalledWith(component.task!);
  });
});
