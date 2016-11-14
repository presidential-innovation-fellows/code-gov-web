"use strict";
var core_1 = require('@angular/core');
var TruncatePipe = (function () {
    function TruncatePipe() {
    }
    TruncatePipe.prototype.transform = function (value, arg) {
        /*
          This check follows the same behavior as Angular 2 standard
          pipes that handle strings such as UppercasePipe.
          Note that a returned null value gets converted to an
          empty string in the template where this pipe is used, which prevents
          problems if this pipe is chained with others. See truncate.pipe.spec.ts
          for tests that illustrate this behavior.
        */
        if (value == null) {
            return null;
        }
        var limit = parseInt(arg, 10) || 10;
        var trail = '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    };
    TruncatePipe = __decorate([
        core_1.Pipe({
            name: 'truncate'
        }), 
        __metadata('design:paramtypes', [])
    ], TruncatePipe);
    return TruncatePipe;
}());
exports.TruncatePipe = TruncatePipe;
//# sourceMappingURL=truncate.pipe.js.map