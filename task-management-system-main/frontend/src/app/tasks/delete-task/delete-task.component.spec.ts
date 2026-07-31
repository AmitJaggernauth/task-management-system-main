/**
 * delete-task.component.spec.ts
 * Week 3 & 4 - Task Management System
 * Author: Nicole Nielsen
 * Purpose: Unit tests for the DeleteTaskComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTaskComponent } from './delete-task.component';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

describe('DeleteTaskComponent', () => {
  let component: DeleteTaskComponent;
  let fixture: ComponentFixture<DeleteTaskComponent>;
  let mockService: jasmine.SpyObj<TaskService>;
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('TaskService', [
      'getTaskById',
      'deleteTask',
    ]);

    mockRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    });

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

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

    await TestBed.configureTestingModule({
      imports: [DeleteTaskComponent, RouterTestingModule],
      providers: [
        { provide: TaskService, useValue: mockService },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteTaskComponent);
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
   * Test 3 — deleteTask() should call service.deleteTask()
   */
  it('should call deleteTask on confirm', () => {
    mockService.deleteTask.and.returnValue(of({}));

    component.ngOnInit();
    component.onDelete();

    expect(mockService.deleteTask).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks/list']);
  });
});
