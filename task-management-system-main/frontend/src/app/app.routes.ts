import { Routes } from '@angular/router';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { ReadTaskComponent } from './tasks/read-task/read-task.component';
import { UpdateTaskComponent } from './tasks/update-task/update-task.component';

export const routes: Routes = [
  { path: 'tasks/create', component: CreateTaskComponent },
  { path: 'tasks/list', component: ListTasksComponent },
  { path: 'tasks/read/:id', component: ReadTaskComponent },
  { path: 'tasks/update/:id', component: UpdateTaskComponent }
];
