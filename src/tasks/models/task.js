"use strict";
var Task = (function () {
    function Task(title) {
        this.completed = false;
        this.createdAt = firebase.database['ServerValue']['TIMESTAMP'];
        this.title = title;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.js.map