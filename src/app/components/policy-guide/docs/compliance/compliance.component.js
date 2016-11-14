"use strict";
var core_1 = require('@angular/core');
var mobile_1 = require('../../../../services/mobile');
var ComplianceComponent = (function () {
    function ComplianceComponent(mobileService) {
        this.mobileService = mobileService;
        this.mobileService.hideMenu();
    }
    ComplianceComponent = __decorate([
        core_1.Component({
            selector: 'compliance',
            template: require('./compliance.template.html')
        }), 
        __metadata('design:paramtypes', [mobile_1.MobileService])
    ], ComplianceComponent);
    return ComplianceComponent;
}());
exports.ComplianceComponent = ComplianceComponent;
//# sourceMappingURL=compliance.component.js.map