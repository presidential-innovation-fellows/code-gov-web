"use strict";
var core_1 = require('@angular/core');
var state_1 = require('../../services/state');
var FourOhFourComponent = (function () {
    function FourOhFourComponent(stateService) {
        this.stateService = stateService;
        this.stateService.set('section', 'four-oh-four');
    }
    FourOhFourComponent = __decorate([
        core_1.Component({
            selector: 'four-oh-four',
            styles: [require('./four-oh-four.style.scss')],
            template: require('./four-oh-four.template.html')
        }), 
        __metadata('design:paramtypes', [state_1.StateService])
    ], FourOhFourComponent);
    return FourOhFourComponent;
}());
exports.FourOhFourComponent = FourOhFourComponent;
//# sourceMappingURL=four-oh-four.component.js.map