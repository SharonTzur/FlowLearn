import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import {TaskService} from "../services/task-service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {KeysPipe} from "../pipes/KeysPipe";
import {TranslatePipe} from "../../translate/translate.pipe";
import {ITask} from "../models/task";
import {AutoCompleteModule} from 'primeng/primeng';
import {UserService} from "../../user/services/user-service";

@Component({
    selector: 'task-form',
    styles: [
        require('./task-form.scss')
    ],
    template: require('./task-form.html'),
    changeDetection: ChangeDetectionStrategy.Default,

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
    communitiesIds: any ;
    uploadPhoto:any;


    @Input() task:any;
    @Output() onChange:EventEmitter<any> = new EventEmitter();
    @Output() goBackToTasks:EventEmitter<any> = new EventEmitter();

    constructor(public taskService: TaskService, private userService : UserService, private route: ActivatedRoute,
                private router: Router,) {
        this.userService.getStudentCommunities();
        this.userService.communities.subscribe((communities) => {
            this.communitiesIds = communities;
        });
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

    goBackToTasksPage(){
        this.goBackToTasks.emit();
    }

    addPhoto(event): void {
        this.taskService.saveImage(event.target.files[0], `tasks-photos/${this.task.$key}.jpg`);
        this.taskService.updateTask(this.task, {featuredImage: `https://firebasestorage.googleapis.com/v0/b/learning-journal.appspot.com/o/tasks-photos%2F${this.task.$key}.jpg?alt=media`}
        ).then((updatedTask)=> {
            this.uploadPhoto = false;
            alert('uploaded successfully');


        }, (error)=> {
            console.log('error: ' + error);
        });


    }

    sendForFeedback(){
        if (!this.internalModel.community|| this.internalModel.community== 'null' || this.internalModel.community == ''){
            alert('you have to define a learning community for sending this task to feedback')
        }
        else{
            this.userService.sendTaskForFeedback(this.internalModel);
        }
    }
}