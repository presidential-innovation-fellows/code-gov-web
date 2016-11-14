"use strict";
var core_1 = require('@angular/core');
var mobile_1 = require('../../../services/mobile');
var DocsComponent = (function () {
    function DocsComponent(mobileService) {
        var _this = this;
        this.mobileService = mobileService;
        this.menuActive = false;
        this.activeMenuSub = mobileService.activeMobileMenu$.subscribe(function (menuStatus) {
            _this.menuActive = menuStatus;
        });
    }
    DocsComponent.prototype.ngOnDestroy = function () {
        if (this.activeMenuSub)
            this.activeMenuSub.unsubscribe();
    };
    DocsComponent = __decorate([
        core_1.Component({
            selector: 'docs',
            styles: [require('./docs.style.scss')],
            template: require('./docs.template.html'),
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [mobile_1.MobileService])
    ], DocsComponent);
    return DocsComponent;
}());
exports.DocsComponent = DocsComponent;
//# sourceMappingURL=docs.component.js.map