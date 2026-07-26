/**
 * update-task.component.spec.ts
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Unit tests for the UpdateTaskComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task.component';
import { TaskService, Task } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;
  let mockService: jasmine.SpyObj<TaskService>;
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('TaskService', [
      'getTasks',
      'updateTask',
    ]);

    mockService.getTasks.and.returnValue(
      of({ success: true, data: [] }), // <-- REQUIRED FIX
    );

    mockRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    });

    TestBed.configureTestingModule({
      imports: [FormsModule, UpdateTaskComponent],
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
   * Test 2 — getTasks() should be called on initialization
   */
  it('should call getTasks on init', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task One', status: 'Pending', priority: 'High' },
    ];

    mockService.getTasks.and.returnValue(
      of({ success: true, data: mockTasks }),
    );

    component.ngOnInit();

    expect(mockService.getTasks).toHaveBeenCalled();
  });

  /**
   * Test 3 — updateTask() should be called on submit
   */
  it('should call updateTask on submit', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task One', status: 'Pending', priority: 'High' },
    ];

    mockService.getTasks.and.returnValue(
      of({ success: true, data: mockTasks }),
    );
    mockService.updateTask.and.returnValue(
      of({ success: true, data: mockTasks[0] }),
    );

    component.ngOnInit();
    component.onSubmit();

    expect(mockService.updateTask).toHaveBeenCalledWith(mockTasks[0]);
  });
});
