"use strict";
var core_1 = require('@angular/core');
var StateService = (function () {
    function StateService() {
        this._state = {};
    }
    Object.defineProperty(StateService.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    StateService.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    StateService.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    StateService.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    StateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateService);
    return StateService;
}());
exports.StateService = StateService;
//# sourceMappingURL=state.service.js.map