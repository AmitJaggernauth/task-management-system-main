/**
 * read-task.component.spec.ts
 * Week 1 & Week 2 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Unit tests for the ReadTaskComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadTaskComponent } from './read-task.component';
import { TaskService, Task } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ReadTaskComponent', () => {
  let component: ReadTaskComponent;
  let fixture: ComponentFixture<ReadTaskComponent>;

  // Mock TaskService
  let mockService: jasmine.SpyObj<TaskService>;

  // Mock ActivatedRoute
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    /**
     * Create a spy object for TaskService
     * Week 2 Requirement: getTaskById(), not getTasks()
     */
    mockService = jasmine.createSpyObj('TaskService', ['getTaskById']);

    /**
     * Mock ActivatedRoute with a fake paramMap.get()
     * Pretend the route is /tasks/read/1
     */
    mockRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    });

    TestBed.configureTestingModule({
      imports: [ReadTaskComponent], // standalone component
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
   * Test 2 — getTaskById() should be called on initialization
   */
  it('should call getTaskById on init', () => {
    const mockTask = {
      id: 1,
      title: 'Task One',
      status: 'Pending',
      priority: 'High',
    };

    mockService.getTaskById.and.returnValue(
      of({ success: true, data: mockTask }),
    );

    fixture.detectChanges(); // triggers ngOnInit()

    expect(mockService.getTaskById).toHaveBeenCalledWith('1');
  });

  /**
   * Test 3 — Should store the correct task returned by the service
   */
  it('should store the task returned by the service', () => {
    const mockTask = {
      id: 1,
      title: 'Task One',
      status: 'Pending',
      priority: 'High',
    };

    mockService.getTaskById.and.returnValue(
      of({ success: true, data: mockTask }),
    );

    fixture.detectChanges();

    expect(component.task).toEqual(mockTask);
  });

  /**
   * Test 4 - Should handle service errors correctly
   * Week 2 Requirement - Error Handling
   */
  it('should store an error message if the service fails', () => {
    mockService.getTaskById.and.returnValue(
      throwError(() => ({ error: { message: 'Task not found' } })),
    );

    fixture.detectChanges();

    expect(component.error).toBe('Task not found');
    expect(component.task).toBeUndefined();
  });
});
