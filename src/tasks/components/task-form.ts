import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {TaskService} from "../services/task-service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {KeysPipe} from "../pipes/KeysPipe";
import {TranslatePipe} from "../../translate/translate.pipe";


@Component({
    selector: 'task-form',
    styles: [
        require('./task-form.scss')
    ],
    template: require('./task-form.html'),
    changeDetection: ChangeDetectionStrategy.OnPush,
    pipes: [KeysPipe, TranslatePipe]

})
export class TaskFormComponent {
    filter: string;
    task: any = {
        content : '',
        title: ''
    };
    title: string = '';
    value: any;

    constructor(public taskService: TaskService, private route: ActivatedRoute,
                private router: Router,) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.filter = params['id'];
        });

        this.task = this.taskService.findTask(this.filter);
    }

    ngOnChanges(changes) {
    }

    clear(): void {
        this.title = '';
    }

    submit(form: any): void {
        this.value = form;
        this.taskService.createTask(this.value);
        this.router.navigate(['/tasks']);
    }
}
