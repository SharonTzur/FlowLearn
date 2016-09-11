"use strict";
require('rxjs/add/observable/merge');
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var ReplaySubject_1 = require('rxjs/ReplaySubject');
var task_1 = require('../models/task');
var auth_service_1 = require("../../auth/services/auth-service");
var TaskService = (function () {
    function TaskService(af, auth) {
        var _this = this;
        this.filter$ = new ReplaySubject_1.ReplaySubject(1);
        var path = "/tasks/" + auth.id;
        this.tasks$ = af.database.list(path);
        this.filteredTasks$ = af.database.list(path, { query: {
                orderByChild: 'completed',
                equalTo: this.filter$
            } });
        this.visibleTasks$ = this.filter$
            .switchMap(function (filter) { return filter === null ? _this.tasks$ : _this.filteredTasks$; });
    }
    TaskService.prototype.filterTasks = function (filter) {
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
    };
    TaskService.prototype.createTask = function (title) {
        return this.tasks$.push(new task_1.Task(title));
    };
    TaskService.prototype.removeTask = function (task) {
        return this.tasks$.remove(task.$key);
    };
    TaskService.prototype.updateTask = function (task, changes) {
        return this.tasks$.update(task.$key, changes);
    };
    TaskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, auth_service_1.AuthService])
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=task-service.js.map