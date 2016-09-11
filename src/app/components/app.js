"use strict";
var core_1 = require('@angular/core');
var auth_service_1 = require("../../auth/services/auth-service");
var AppComponent = (function () {
    function AppComponent(auth) {
        this.auth = auth;
    }
    AppComponent.prototype.signOut = function () {
        this.auth.signOut();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            styles: [
                require('./app.scss')
            ],
            template: "\n    <app-header\n      [authenticated]=\"auth.authenticated\"\n      (signOut)=\"signOut()\"></app-header>\n    \n    <main class=\"main\">\n      <router-outlet></router-outlet>\n    </main>\n  "
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map