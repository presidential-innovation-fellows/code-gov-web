"use strict";
var core_1 = require('@angular/core');
var mobile_1 = require('../../../../services/mobile');
var OverviewComponent = (function () {
    function OverviewComponent(mobileService) {
        this.mobileService = mobileService;
        this.mobileService.hideMenu();
    }
    OverviewComponent = __decorate([
        core_1.Component({
            selector: 'overview',
            template: require('./overview.template.html')
        }), 
        __metadata('design:paramtypes', [mobile_1.MobileService])
    ], OverviewComponent);
    return OverviewComponent;
}());
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overview.component.js.map