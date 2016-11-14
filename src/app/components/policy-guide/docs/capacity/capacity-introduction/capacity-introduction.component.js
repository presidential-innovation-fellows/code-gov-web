"use strict";
var core_1 = require('@angular/core');
var seo_1 = require('../../../../../services/seo');
var CapacityIntroductionComponent = (function () {
    function CapacityIntroductionComponent(seoService) {
        this.seoService = seoService;
        seoService.setTitle('Introduction - Building your Agency\'s Open Source Practice', true);
        seoService.setMetaDescription('Recommendations for an interdisciplinary approach to Open Source for Federal agencies.');
        seoService.setMetaRobots('Index, Follow');
    }
    CapacityIntroductionComponent = __decorate([
        core_1.Component({
            selector: 'introduction',
            template: require('./capacity-introduction.template.html')
        }), 
        __metadata('design:paramtypes', [seo_1.SeoService])
    ], CapacityIntroductionComponent);
    return CapacityIntroductionComponent;
}());
exports.CapacityIntroductionComponent = CapacityIntroductionComponent;
//# sourceMappingURL=capacity-introduction.component.js.map