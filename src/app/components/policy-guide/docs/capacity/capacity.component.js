"use strict";
var core_1 = require('@angular/core');
var mobile_1 = require('../../../../services/mobile');
var CapacityComponent = (function () {
    function CapacityComponent(mobileService) {
        this.mobileService = mobileService;
        this.mobileService.hideMenu();
    }
    CapacityComponent = __decorate([
        core_1.Component({
            selector: 'capacity',
            template: require('./capacity.template.html')
        }), 
        __metadata('design:paramtypes', [mobile_1.MobileService])
    ], CapacityComponent);
    return CapacityComponent;
}());
exports.CapacityComponent = CapacityComponent;
//# sourceMappingURL=capacity.component.js.map