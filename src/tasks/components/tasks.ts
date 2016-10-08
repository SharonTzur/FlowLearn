import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {TaskService} from '../services/task-service';
import {TranslatePipe} from "../../translate/translate.pipe";


@Component({
    template: `
   
      <div class="g-row">
      <a class="create-btn" (click)="goToCreateMode(null)">{{"add activity" | translate}}</a>
        <!--<task-form (createTask)="taskService.createTask($event)"></task-form>-->
      </div>

      <div  class="g-row">
        <task-list
          [filter]="filter | async"
          [tasks]="taskService.filteredTasks"
          (remove)="taskService.removeTask($event)"
          (update)="taskService.updateTask($event.task, $event.changes)"></task-list>
      </div>
   
  `,
    styles: [
        require('./tasks.scss')
    ],
    pipes: [
        TranslatePipe
    ], changeDetection: ChangeDetectionStrategy.Default,


})

export class TasksComponent {
    filter: Observable<any>;

    constructor(public route: ActivatedRoute, public router: Router, public taskService: TaskService) {
        this.filter = route.params
            .pluck('completed')
            .do((value: string) => taskService.filterTasks(value));
    }

    goToCreateMode() {
        this.router.navigate(['/create', 0]);
    }



}
