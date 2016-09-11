"use strict";
require('rxjs/add/operator/do');
require('rxjs/add/operator/pluck');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var task_service_1 = require('../services/task-service');
var TasksComponent = (function () {
    function TasksComponent(route, taskService) {
        this.route = route;
        this.taskService = taskService;
        this.filter = route.params
            .pluck('completed')
            .do(function (value) { return taskService.filterTasks(value); });
    }
    TasksComponent = __decorate([
        core_1.Component({
            template: "\n    <div class=\"g-row\">\n      <div class=\"g-col\">\n        <task-form (createTask)=\"taskService.createTask($event)\"></task-form>\n      </div>\n\n      <div class=\"g-col\">\n        <task-list\n          [filter]=\"filter | async\"\n          [tasks]=\"taskService.visibleTasks$\"\n          (remove)=\"taskService.removeTask($event)\"\n          (update)=\"taskService.updateTask($event.task, $event.changes)\"></task-list>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, task_service_1.TaskService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.js.map