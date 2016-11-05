import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AuthService} from 'src/auth';
import {ITask, Task} from '../models/task';
import {ACTION_SUGGESTIONS, TYPE_SUGGESTIONS, REASON_SUGGESTIONS} from '../suggestions/suggestions-data'
import {FirebaseModule} from "../../firebase/index";


@Injectable()
export class TaskService {
    visibleTasks$: Observable<ITask[]>;
    reqTask: ITask;
    private filter$: ReplaySubject<any> = new ReplaySubject(1);
    private filteredTasks: any;
    private tasks$: any;
    /* private filteredTasks$: FirebaseListObservable<ITask[]>;
     private tasks$: FirebaseListObservable<ITask[]>;*/
    db$: any;
    reqId: string;
    actionSuggestions: string[] = ACTION_SUGGESTIONS;
    typeSuggestions: string[] = TYPE_SUGGESTIONS;
    storage: any;
    storageRef: any;
    userTasksIds: any;
    userTasks: any;
    tasksPath$: any;
    newTasks$: any;

    constructor(public af: AngularFire, public auth: AuthService) {
        const path = `/tasks/`;
        this.db$ = firebase.database().ref();

        this.tasksPath$ = this.db$.child(`/tasks/`);

        this.userTasks = this.db$.child(`/users/${this.auth.id}/tasks`);

        this.getTasks(this.userTasks).subscribe((userTasks)=> {
            var userTasksIdsArr = [];
            for (let taskId in userTasks) {
                userTasksIdsArr.push(userTasks[taskId].taskId);
            }
            this.userTasksIds = userTasksIdsArr;

            this.getTasks(this.tasksPath$).subscribe((tasks)=> {
                this.tasks$ = tasks;
                var filteredTasks = [];
                var tasksIds = this.userTasksIds;
                for (let taskId in tasks) {
                    if (tasksIds.includes(taskId)) {
                        let newTask = tasks[taskId];
                        newTask["$key"] = taskId;
                        filteredTasks.push(newTask);
                    }
                }
                this.filteredTasks = filteredTasks;
            });
        });


        this.storage = firebase.storage();
        this.storageRef = this.storage.ref();


    }

    getTasks(ref) {
        return Observable.create(function (observer: any) {
            function value(snapshot) {
                observer.next(snapshot.val());
            }

            ref.on('value', value);
            return (()=> {
                ref.off('value', value);

            })
        });
    }


    filterTasks(filter: string): void {
        switch (filter) {
            case 'false':
                this.filter$.next(false);
                break;

            case 'true':
                this.filter$.next(true);
                break;

            default:
                this.filter$.next(null);
                break;
        }
    }

    findTask(filter: string): any {
        this.reqId = filter;
        return this.af.database.object(`/tasks/${this.reqId}`);
    }

    createTask(task: any): firebase.Promise<any> {
        // return this.tasks$.push(task);
        task.users = {
            owner: [this.auth.id],
            partners: [],
            feedback: []
        };


        return this.tasksPath$.push(task).then((createdTask)=> {
            this.tasksPath$.child(`/${createdTask.key}/log`).push( {
                date: new Date().toLocaleString(),
                action: 'created',
                user: this.auth.id
            });
            this.userTasks.push({
                taskId: createdTask.key,
                relation: 'creator',
                active: true
            }).then((updated)=>{
                this.userTasks.child(`/${updated.key}/log`).push({
                    date: new Date().toLocaleString(),
                    action: 'created',
                    user: this.auth.id
                })
            });

        });
    }

    removeTask(task: ITask): firebase.Promise<any> {
        return this.tasksPath$.child(task.$key).remove().then(()=> {
            this.userTasks.orderByChild("taskId").equalTo(task.$key).on("value", (snapshot)=> {
                if (snapshot.val() && Object.keys(snapshot.val())[0]) {
                    this.userTasks.child(Object.keys(snapshot.val())[0]).remove();
                }
            })
        })
    }

    updateTask(task: any, changes: any): any {
        return this.tasksPath$.child(task["$key"]).update(changes);
    }

    getTypeResults(query: string): any {
        return this.typeSuggestions.filter((type)=> {
            return type.startsWith(query);
        })
    }

    saveImage(file: any, path: any) {
        var imageRef = this.storageRef.child(path);
        imageRef.put(file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
}
