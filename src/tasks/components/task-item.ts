import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ITask} from '../models/task';
import {KeysPipe} from "../pipes/KeysPipe";


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

    editing: boolean = false;
    value: any;

    editTitle(): void {
        this.editing = true;

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
