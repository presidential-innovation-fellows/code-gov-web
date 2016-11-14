"use strict";
var core_1 = require('@angular/core');
var mobile_1 = require('../../../services/mobile');
var AgenciesComponent = (function () {
    function AgenciesComponent(mobileService) {
        this.mobileService = mobileService;
        this.mobileService.hideMenu();
    }
    AgenciesComponent = __decorate([
        core_1.Component({
            selector: 'agencies',
            styles: [require('./agencies.style.scss')],
            template: require('./agencies.template.html')
        }), 
        __metadata('design:paramtypes', [mobile_1.MobileService])
    ], AgenciesComponent);
    return AgenciesComponent;
}());
exports.AgenciesComponent = AgenciesComponent;
//# sourceMappingURL=agencies.component.js.map