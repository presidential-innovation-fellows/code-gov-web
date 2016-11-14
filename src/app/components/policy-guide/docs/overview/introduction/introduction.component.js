"use strict";
var core_1 = require('@angular/core');
var seo_1 = require('../../../../../services/seo');
var IntroductionComponent = (function () {
    function IntroductionComponent(seoService) {
        this.seoService = seoService;
        seoService.setTitle('Policy Implementation Introduction', true);
        seoService.setMetaDescription('Start here for an overview of the Federal Open Source Code Policy.');
        seoService.setMetaRobots('Index, Follow');
    }
    IntroductionComponent = __decorate([
        core_1.Component({
            selector: 'introduction',
            template: require('./introduction.template.html')
        }), 
        __metadata('design:paramtypes', [seo_1.SeoService])
    ], IntroductionComponent);
    return IntroductionComponent;
}());
exports.IntroductionComponent = IntroductionComponent;
//# sourceMappingURL=introduction.component.js.map