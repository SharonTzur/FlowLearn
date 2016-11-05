import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {TaskService} from "../services/task-service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {KeysPipe} from "../pipes/KeysPipe";
import {TranslatePipe} from "../../translate/translate.pipe";

@Component({
    selector: 'task-create',
    styles: [
        require('./task-form.scss')
    ],
    template: `<div class="g-row">
    <task-form [task]="task" (goBackToTasks)="goBackToTasks()" (onChange)="submit($event)"></task-form>
     
</div>`,
    changeDetection: ChangeDetectionStrategy.Default,
    pipes: [KeysPipe, TranslatePipe],
})
export class TaskCreateComponent {
    filter: string;
    value: any;
    task: any = {};
    changesObj: any;
    newTaskObj: any;
    uploadPhoto: boolean = false;

    constructor(public taskService: TaskService, private route: ActivatedRoute,
                private router: Router,) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.filter = params['id'];
        });
        if (this.filter != "0") {
            this.taskService.findTask(this.filter).subscribe((res)=> {
                this.task = res;
            });
        }
    }

    ngOnChanges(changes) {
    }

    submit(form: any): void {
        this.value = form;
        if (this.value.$key) {
            this.changesObj = {
                title: this.value.title || "",
                content: this.value.content || "",
                type: this.value.type || [],
                reason: this.value.reason || "",
                products: this.value.products || "",
                conclusions: this.value.conclusions || "",
                featuredImage: this.value.featuredImage || "",
                community: this.value.community || ""
            };
            this.taskService.updateTask(this.task, this.changesObj).then((updatedTask)=> {
                this.goBackToTasks();

            }, (error)=> {
                console.log('error: ' + error);
            });
        }

        else {
            this.newTaskObj = {
                title: this.value.title || "",
                content: this.value.content || "",
                type: this.value.type || [],
                reason: this.value.reason || "",
                products: this.value.products || "",
                conclusions: this.value.conclusions || "",
                featuredImage: this.value.featuredImage || "",
                community: this.value.community || ""
            };
            this.taskService.createTask(this.newTaskObj).then((updatedTask)=> {
                this.goBackToTasks();
            }, (error)=> {
                console.log('error: ' + error);
            });
            this.goBackToTasks();

        }
        this.goBackToTasks();

    }

    goBackToTasks(): void {
        this.router.navigate(['/tasks']);
    }


}
