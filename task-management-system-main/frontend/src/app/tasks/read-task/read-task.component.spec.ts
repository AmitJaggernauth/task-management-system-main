/**
 * read-task.component.spec.ts
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Unit tests for the ReadTaskComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadTaskComponent } from './read-task.component';
import { TaskService, Task } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ReadTaskComponent', () => {
  let component: ReadTaskComponent;
  let fixture: ComponentFixture<ReadTaskComponent>;
  let mockService: jasmine.SpyObj<TaskService>;
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    // Mock TaskService
    mockService = jasmine.createSpyObj('TaskService', ['getTasks']);

    // Mock ActivatedRoute with a fake paramMap.get()
    mockRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: () => '1', // Pretend the route is /tasks/read/1
        },
      },
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: TaskService, useValue: mockService },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    });

    fixture = TestBed.createComponent(ReadTaskComponent);
    component = fixture.componentInstance;
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
   * Test 3 — Should store the correct task based on route param
   */
  it('should store the task matching the route ID', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task One', status: 'Pending', priority: 'High' },
      { id: 2, title: 'Task Two', status: 'Complete', priority: 'Low' },
    ];

    mockService.getTasks.and.returnValue(
      of({ success: true, data: mockTasks }),
    );

    component.ngOnInit();

    expect(component.task).toEqual(mockTasks[0]); // ID 1
  });
});
