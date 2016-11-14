"use strict";
var core_1 = require('@angular/core');
var agency_1 = require('../../../../services/agency');
var mobile_1 = require('../../../../services/mobile');
var AgencySidebarComponent = (function () {
    function AgencySidebarComponent(agencyService, mobileService) {
        this.agencyService = agencyService;
        this.mobileService = mobileService;
        this.menuActive = mobileService.activeMobileMenu$;
    }
    AgencySidebarComponent.prototype.ngOnInit = function () {
        this.agencies = this.agencyService.getAgencies();
    };
    AgencySidebarComponent = __decorate([
        core_1.Component({
            selector: 'agency-sidebar',
            styles: [require('./agency-sidebar.style.scss')],
            template: require('./agency-sidebar.template.html')
        }), 
        __metadata('design:paramtypes', [agency_1.AgencyService, mobile_1.MobileService])
    ], AgencySidebarComponent);
    return AgencySidebarComponent;
}());
exports.AgencySidebarComponent = AgencySidebarComponent;
//# sourceMappingURL=agency-sidebar.component.js.map