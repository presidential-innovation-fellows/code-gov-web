"use strict";
var core_1 = require('@angular/core');
var seo_1 = require('../../../../../services/seo');
var ComplianceMeasuringCodeComponent = (function () {
    function ComplianceMeasuringCodeComponent(seoService) {
        this.seoService = seoService;
        seoService.setTitle('Measuring Source Code', true);
        seoService.setMetaDescription('Learn about different ways to measure source code and how to choose the best method for your agency.');
        seoService.setMetaRobots('Index, Follow');
    }
    ComplianceMeasuringCodeComponent = __decorate([
        core_1.Component({
            selector: 'measuring-code',
            template: require('./compliance-measuring-code.template.html')
        }), 
        __metadata('design:paramtypes', [seo_1.SeoService])
    ], ComplianceMeasuringCodeComponent);
    return ComplianceMeasuringCodeComponent;
}());
exports.ComplianceMeasuringCodeComponent = ComplianceMeasuringCodeComponent;
//# sourceMappingURL=compliance-measuring-code.component.js.map