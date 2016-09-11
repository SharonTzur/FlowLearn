import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {TaskService} from "../services/task-service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'task-form',
    styles: [
        require('./task-form.scss')
    ],
    /*  template: `
     <form class="task-form" (ngSubmit)="submit()" novalidate>
     <input
     [(ngModel)]="title"
     (keyup.escape)="clear()"
     autocomplete="off"
     autofocus
     class="task-form__input"
     name="title"
     placeholder="What needs to be done?"
     required
     type="text">
     </form>
     `*/
    template: require('./task-form.html')
})

export class TaskFormComponent {
    constructor(public taskService: TaskService,  private route: ActivatedRoute,
                private router: Router,) {

    }

    title: string = '';
    value: any;

    clear(): void {
        this.title = '';
    }

    submit(form: any): void {
        this.value = form;
        this.taskService.createTask(this.value);
        this.router.navigate(['/tasks']);
    }
}
