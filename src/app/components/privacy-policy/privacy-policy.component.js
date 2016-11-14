"use strict";
var core_1 = require('@angular/core');
var state_1 = require('../../services/state');
var seo_1 = require('../../services/seo');
var PrivacyPolicyComponent = (function () {
    function PrivacyPolicyComponent(seoService, stateService) {
        this.seoService = seoService;
        this.stateService = stateService;
        this.stateService.set('section', 'privacy-policy');
        this.seoService.setTitle('Privacy Policy', true);
        this.seoService.setMetaDescription('Learn about how Code.gov is using cookies and analytics.');
        this.seoService.setMetaRobots('Index, Follow');
    }
    PrivacyPolicyComponent = __decorate([
        core_1.Component({
            selector: 'privacy-policy',
            styles: [require('./privacy-policy.style.scss')],
            template: require('./privacy-policy.template.html')
        }), 
        __metadata('design:paramtypes', [seo_1.SeoService, state_1.StateService])
    ], PrivacyPolicyComponent);
    return PrivacyPolicyComponent;
}());
exports.PrivacyPolicyComponent = PrivacyPolicyComponent;
//# sourceMappingURL=privacy-policy.component.js.map