"use strict";
var core_1 = require('@angular/core');
var state_1 = require('../../services/state');
var ExploreCodeComponent = (function () {
    function ExploreCodeComponent(stateService) {
        this.stateService = stateService;
        this.stateService.set('section', 'explore-code');
    }
    ExploreCodeComponent = __decorate([
        core_1.Component({
            selector: 'explore-code',
            styles: [require('./explore-code.style.scss')],
            template: require('./explore-code.template.html')
        }), 
        __metadata('design:paramtypes', [state_1.StateService])
    ], ExploreCodeComponent);
    return ExploreCodeComponent;
}());
exports.ExploreCodeComponent = ExploreCodeComponent;
//# sourceMappingURL=explore-code.component.js.map