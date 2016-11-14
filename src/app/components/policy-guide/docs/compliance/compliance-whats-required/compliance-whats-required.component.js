"use strict";
var core_1 = require('@angular/core');
var seo_1 = require('../../../../../services/seo');
var ComplianceWhatsRequiredComponent = (function () {
    function ComplianceWhatsRequiredComponent(seoService) {
        this.seoService = seoService;
        seoService.setTitle('Policy Compliance - What\'s Required?', true);
        seoService.setMetaDescription('Learn about the requirements of the Federal Source Code Policy and when they have to be completed.');
        seoService.setMetaRobots('Index, Follow');
    }
    ComplianceWhatsRequiredComponent = __decorate([
        core_1.Component({
            selector: 'compliance-whats-required',
            template: require('./compliance-whats-required.template.html')
        }), 
        __metadata('design:paramtypes', [seo_1.SeoService])
    ], ComplianceWhatsRequiredComponent);
    return ComplianceWhatsRequiredComponent;
}());
exports.ComplianceWhatsRequiredComponent = ComplianceWhatsRequiredComponent;
//# sourceMappingURL=compliance-whats-required.component.js.map