"use strict";
var core_1 = require('@angular/core');
var agency_data_1 = require('./agency.data');
var AgencyService = (function () {
    function AgencyService() {
        this.agencies = agency_data_1.AGENCIES;
    }
    AgencyService.prototype.getAgencies = function () {
        return this.agencies;
    };
    AgencyService.prototype.getAgency = function (id) {
        return this.agencies.filter(function (agency) { return agency.id === id; })[0];
    };
    AgencyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AgencyService);
    return AgencyService;
}());
exports.AgencyService = AgencyService;
//# sourceMappingURL=agency.service.js.map