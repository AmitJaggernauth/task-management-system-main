/**
 * list-tasks.component.spec.ts
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Unit tests for the ListTasksComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTasksComponent } from './list-tasks.component';
import { TaskService, Task } from '../../services/task.service';
import { of } from 'rxjs';

describe('ListTasksComponent', () => {
  let component: ListTasksComponent;
  let fixture: ComponentFixture<ListTasksComponent>;
  let mockService: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('TaskService', ['getTasks']);

    TestBed.configureTestingModule({
      declarations: [ListTasksComponent],
      providers: [{ provide: TaskService, useValue: mockService }],
    });

    fixture = TestBed.createComponent(ListTasksComponent);
    component = fixture.componentInstance;
  });

  /**
   * Test 1 - Component should be created successfully
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test 2: getTasks() should be called on initialization
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
    expect(component.tasks.length).toBe(1);
  });

  /**
   * Test 3: tasks returned from the service should be stored correctly
   */
  it('should store tasks returned by the service', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task One', status: 'Pending', priority: 'High' },
      { id: 2, title: 'Task Two', status: 'Complete', priority: 'Low' },
    ];

    mockService.getTasks.and.returnValue(
      of({ success: true, data: mockTasks }),
    );

    component.ngOnInit();

    expect(component.tasks).toEqual(mockTasks);
  });
});
