"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var ReposService = (function () {
    function ReposService(http) {
        this.http = http;
    }
    ReposService.prototype.getJsonFile = function () {
        return this.http.get('assets/repos.json')
            .map(function (response) { return response.json(); });
    };
    ReposService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReposService);
    return ReposService;
}());
exports.ReposService = ReposService;
//# sourceMappingURL=repos.service.js.map