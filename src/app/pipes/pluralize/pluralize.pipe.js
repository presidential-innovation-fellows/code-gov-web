"use strict";
var Pluralize = require('pluralize');
var core_1 = require('@angular/core');
var PluralizePipe = (function () {
    function PluralizePipe() {
    }
    PluralizePipe.prototype.transform = function (value, arg) {
        var pluralize = Pluralize;
        return pluralize.plural(value, arg);
    };
    PluralizePipe = __decorate([
        core_1.Pipe({
            name: 'pluralize'
        }), 
        __metadata('design:paramtypes', [])
    ], PluralizePipe);
    return PluralizePipe;
}());
exports.PluralizePipe = PluralizePipe;
//# sourceMappingURL=pluralize.pipe.js.map