"use strict";
require('rxjs/add/operator/do');
require('rxjs/add/operator/take');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('../services/auth-service');
var UnauthGuard = (function () {
    function UnauthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    UnauthGuard.prototype.canActivate = function () {
        var _this = this;
        return this.auth.auth$
            .take(1)
            .map(function (authState) { return !authState; })
            .do(function (unauthenticated) {
            if (!unauthenticated) {
                _this.router.navigate(['/tasks']);
            }
        });
    };
    UnauthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], UnauthGuard);
    return UnauthGuard;
}());
exports.UnauthGuard = UnauthGuard;
//# sourceMappingURL=unauth-guard.js.map