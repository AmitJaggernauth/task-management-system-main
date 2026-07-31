/**
 * create-task.component.spec.ts
 * Week 1 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Unit tests for the CreateTaskComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateTaskComponent } from './create-task.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';

// Mock TaskService to isolate component testing
describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let mockService: jasmine.SpyObj<TaskService>;

  // Setup the testing module and create the component before each test
  beforeEach(() => {
    mockService = jasmine.createSpyObj('TaskService', ['createTask']);

    TestBed.configureTestingModule({
      imports: [CreateTaskComponent, FormsModule],
      providers: [{ provide: TaskService, useValue: mockService }],
    });

    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to ensure the component is created successfully
  it('should create the component', () => {
    expect(component).toBeTruthy(); // Check that the component instance is created
  });

  // Test to ensure the task model starts with empty required fields
  it('should start with empty required fields', () => {
    expect(component.task.title).toBe('');
    expect(component.task.status).toBe('');
    expect(component.task.priority).toBe('');
  });

  // Test to ensure the onSubmit method calls TaskService
  it('should call TaskService.createTask on submit', () => {
    mockService.createTask.and.returnValue(
      of({
        success: true,
        data: {
          id: 1,
          title: 'Test',
          status: 'Pending',
          priority: 'High',
        },
      }),
    );

    component.onSubmit();

    expect(mockService.createTask).toHaveBeenCalledWith(component.task);
  });
});
