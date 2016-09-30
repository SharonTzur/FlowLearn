import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import {TaskService} from "../services/task-service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {KeysPipe} from "../pipes/KeysPipe";
import {TranslatePipe} from "../../translate/translate.pipe";
import {ITask} from "../models/task";
import {AutoCompleteModule} from 'primeng/primeng';

@Component({
    selector: 'task-form',
    styles: [
        require('./task-form.scss')
    ],
    template: require('./task-form.html'),
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TaskFormComponent implements OnChanges{

    value: any;
    editType: boolean = false;
    editReason: boolean = false;
    editProducts: boolean = false;
    editConclusions: boolean = false;
    editContent: boolean = true;
    typeQuery: string;
    typeResults: string[] = this.taskService.typeSuggestions;


    @Input() task:any;
    @Output() onChange:EventEmitter<any> = new EventEmitter();
    @Output() goBackToTasks:EventEmitter<any> = new EventEmitter();

    constructor(public taskService: TaskService, private route: ActivatedRoute,
                private router: Router,) {

    }

    ngOnInit() {

    }

    internalModel:any;

    ngOnChanges(changes:any):void {
        var taskChange = changes.task.currentValue;
        if (taskChange) {
            this.internalModel = taskChange;
        }
    }

    onSave():void {
        this.onChange.emit(this.internalModel);
        event.preventDefault();

    }
    changeTab(tab) {
        this.editType = false;
        this.editReason = false;
        this.editProducts = false;
        this.editConclusions = false;
        this.editContent = false;
        this[tab] = !this[tab];
    }

    searchType(event) {
        this.typeResults = this.taskService.getTypeResults(event.query);
    }

    typeEnter(event){
        if(this.typeResults.length == 0){
            this.task.type.push(event.target.value);
            event.target.value="";
        }
    }
}