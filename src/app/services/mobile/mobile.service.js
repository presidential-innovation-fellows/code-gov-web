"use strict";
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var MobileService = (function () {
    function MobileService() {
        this.mobileMenuActive = new Subject_1.Subject();
        this.activeMobileMenu$ = this.mobileMenuActive.asObservable();
        this.active = false;
    }
    MobileService.prototype.changeMenuStatus = function () {
        this.mobileMenuActive.next(this.active);
    };
    MobileService.prototype.hideMenu = function () {
        this.active = false;
        this.changeMenuStatus();
    };
    MobileService.prototype.toggleMenu = function () {
        this.active = !this.active;
        this.changeMenuStatus();
    };
    MobileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MobileService);
    return MobileService;
}());
exports.MobileService = MobileService;
//# sourceMappingURL=mobile.service.js.map