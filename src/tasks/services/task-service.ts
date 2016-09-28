import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AuthService} from 'src/auth';
import {ITask, Task} from '../models/task';


@Injectable()
export class TaskService {
    visibleTasks$: Observable<ITask[]>;
    reqTask: ITask;
    private filter$: ReplaySubject<any> = new ReplaySubject(1);
    private filteredTasks$: FirebaseListObservable<ITask[]>;
    private tasks$: FirebaseListObservable<ITask[]>;
    reqId: string;

    constructor(public af: AngularFire, public auth: AuthService) {
        const path = `/tasks/${auth.id}`;

        this.tasks$ = af.database.list(path);

        this.filteredTasks$ = af.database.list(path, {
            query: {
                orderByChild: 'completed',
                equalTo: this.filter$
            }
        });

        this.visibleTasks$ = this.filter$
            .switchMap(filter => filter === null ? this.tasks$ : this.filteredTasks$);


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
        return this.af.database.object(`/tasks/${this.auth.id}/${this.reqId}`)

    }

    createTask(task: any): firebase.Promise<any> {
        return this.tasks$.push(task);
    }

    removeTask(task: ITask): firebase.Promise<any> {
        return this.tasks$.remove(task.$key);
    }

    updateTask(task: any, changes: any): any {
         return this.tasks$.update(task["$key"], changes);
    }
}
