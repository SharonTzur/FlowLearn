import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ITask} from '../models/task';
import {KeysPipe} from "../pipes/KeysPipe";
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'task-item',
    styles: [
        require('./task-item.scss')
    ],
    template: require('./task-item.html'),
    pipes: [KeysPipe]
})

export class TaskItemComponent {
    @Input() task: ITask;
    @Output() remove = new EventEmitter(false);
    @Output() update = new EventEmitter(false);
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        ) {}
    editing: boolean = false;
    value: any;

    editTitle(): void {
        this.router.navigate(['/create', this.task.$key]);

    }

    saveForm(form: any): void {
        this.value = form;
        if (this.editing) {
            this.update.emit(form);
            this.stopEditing();
        }
    }

    stopEditing(): void {
        this.editing = false;
    }

    toggleStatus(): void {
        this.update.emit({
            completed: !this.task.completed
        });
    }
}
