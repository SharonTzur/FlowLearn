import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../auth';

import {TaskFormComponent} from './components/task-form';
import {TaskItemComponent} from './components/task-item';
import {TaskListComponent} from './components/task-list';
import {TasksComponent} from './components/tasks';
import {AutoFocusDirective} from './directives/autofocus-directive';
import {TaskService} from './services/task-service';
import {AutoCompleteModule} from 'primeng/primeng';
import {TaskCreateComponent} from "./components/task-create";



const routes: Routes = [
    {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
    {path: 'create/:id', component: TaskCreateComponent, canActivate: [AuthGuard]},
    // {path: 'tasks/create', component: TaskFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
    declarations: [
        AutoFocusDirective,
        TaskFormComponent,
        TaskItemComponent,
        TaskListComponent,
        TasksComponent,
        TaskCreateComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        AutoCompleteModule

    ],
    providers: [
        TaskService
    ]
})

export class TasksModule {
}

export {TaskService};
