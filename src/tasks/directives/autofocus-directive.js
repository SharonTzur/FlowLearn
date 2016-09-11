"use strict";
var core_1 = require('@angular/core');
var AutoFocusDirective = (function () {
    function AutoFocusDirective(element) {
        this.element = element;
    }
    AutoFocusDirective.prototype.ngOnInit = function () {
        this.element.nativeElement.focus();
    };
    AutoFocusDirective = __decorate([
        core_1.Directive({
            selector: '[autoFocus]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AutoFocusDirective);
    return AutoFocusDirective;
}());
exports.AutoFocusDirective = AutoFocusDirective;
//# sourceMappingURL=autofocus-directive.js.map