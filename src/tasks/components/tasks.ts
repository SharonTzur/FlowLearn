import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TaskService } from '../services/task-service';


@Component({
  template: `
   
      <div class="g-row">
      <a class="create-btn" routerLink="create">Add Activity</a>
        <!--<task-form (createTask)="taskService.createTask($event)"></task-form>-->
      </div>

      <div  class="g-row">
        <task-list
          [filter]="filter | async"
          [tasks]="taskService.visibleTasks$"
          (remove)="taskService.removeTask($event)"
          (update)="taskService.updateTask($event.task, $event.changes)"></task-list>
      </div>
   
  `,
  styles: [
    require('./tasks.scss')
  ],
})

export class TasksComponent {
  filter: Observable<any>;

  constructor(public route: ActivatedRoute, public taskService: TaskService) {
    this.filter = route.params
      .pluck('completed')
      .do((value: string) => taskService.filterTasks(value));
  }

}
