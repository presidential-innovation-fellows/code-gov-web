"use strict";
var core_1 = require('@angular/core');
var state_1 = require('../../services/state');
var PolicyGuideComponent = (function () {
    function PolicyGuideComponent(stateService) {
        this.stateService = stateService;
        this.stateService.set('section', 'policy-guide');
    }
    PolicyGuideComponent = __decorate([
        core_1.Component({
            selector: 'policy-guide',
            styles: [require('./policy-guide.style.scss')],
            template: require('./policy-guide.template.html')
        }), 
        __metadata('design:paramtypes', [state_1.StateService])
    ], PolicyGuideComponent);
    return PolicyGuideComponent;
}());
exports.PolicyGuideComponent = PolicyGuideComponent;
//# sourceMappingURL=policy-guide.component.js.map