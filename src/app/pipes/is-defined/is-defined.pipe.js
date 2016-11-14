"use strict";
var core_1 = require('@angular/core');
/**
 * Pipe used in boolean expressions in a template to signify
 * that the pipe value argument is defined using the
 * transform() method.
 *
 * If the transform() argument is defined, then the method
 * will return true. However, if the argument to transform()
 * is a string and it can be trimmed to an empty string,
 * then false is returned. Also, if the argument to tranform()
 * is a string with a trimmed value of 'null' or 'undefined;,
 * then false is returned.
 *
 */
var IsDefinedPipe = (function () {
    function IsDefinedPipe() {
    }
    /**
     * Test method used to implement PipeTransform
     * where the actual define check is done.
     *
     * @param value - The value to check if it is a defined value
     * @param args - Not used by this pipe
     * @return true if value is defined or if a string
     * that the trimmed value is not an empty string
     * or one whose value is 'null' or 'undefined', otherwise false.
     */
    IsDefinedPipe.prototype.transform = function (value, args) {
        if (typeof value === 'string') {
            return this.isDefinedString(value);
        }
        else if (typeof value === 'number') {
            return this.isDefinedNumber(value);
        }
        else if (value) {
            return true;
        }
        return false;
    };
    IsDefinedPipe.prototype.isDefinedString = function (value) {
        value = value.trim();
        if (value === 'null') {
            return false;
        }
        else if (value === 'undefined') {
            return false;
        }
        else {
            if (value) {
                return true;
            }
        }
    };
    IsDefinedPipe.prototype.isDefinedNumber = function (value) {
        // In this case, zero is truthy,
        //  since in JavaScript, zero is false/falsy
        if (value === 0) {
            return true;
        }
        else {
            if (value) {
                return true;
            }
        }
    };
    IsDefinedPipe = __decorate([
        core_1.Pipe({
            name: 'isdefined'
        }), 
        __metadata('design:paramtypes', [])
    ], IsDefinedPipe);
    return IsDefinedPipe;
}());
exports.IsDefinedPipe = IsDefinedPipe;
//# sourceMappingURL=is-defined.pipe.js.map