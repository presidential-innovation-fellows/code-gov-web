"use strict";
var core_1 = require('@angular/core');
var mobile_1 = require('../../services/mobile');
var ToggleMenuDirective = (function () {
    function ToggleMenuDirective(el, mobileService) {
        this.el = el;
        this.mobileService = mobileService;
        this.toggle = JSON.parse(this.el.nativeElement.getAttribute('aria-pressed'));
    }
    ToggleMenuDirective.prototype.onClick = function (event) {
        event.preventDefault();
        this.mobileService.toggleMenu();
        this.togglePressed();
    };
    ToggleMenuDirective.prototype.togglePressed = function () {
        this.toggle = !this.toggle;
        this.el.nativeElement.setAttribute('aria-pressed', this.toggle);
    };
    ToggleMenuDirective = __decorate([
        core_1.Directive({
            selector: '[toggle-menu]',
            host: {
                '(click)': 'onClick($event)'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, mobile_1.MobileService])
    ], ToggleMenuDirective);
    return ToggleMenuDirective;
}());
exports.ToggleMenuDirective = ToggleMenuDirective;
//# sourceMappingURL=toggle-menu.directive.js.map