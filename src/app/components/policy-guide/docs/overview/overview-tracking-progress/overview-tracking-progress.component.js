"use strict";
var core_1 = require('@angular/core');
var seo_1 = require('../../../../../services/seo');
var OverviewTrackingProgressComponent = (function () {
    function OverviewTrackingProgressComponent(seoService) {
        this.seoService = seoService;
        seoService.setTitle('How OMB Will Assess Agency Progress', true);
        seoService.setMetaDescription('Learn how agency progress implementing the Source Code Policy will be tracked and measured.');
        seoService.setMetaRobots('Index, Follow');
    }
    OverviewTrackingProgressComponent = __decorate([
        core_1.Component({
            selector: 'overview-tracking-progress',
            template: require('./overview-tracking-progress.template.html')
        }), 
        __metadata('design:paramtypes', [seo_1.SeoService])
    ], OverviewTrackingProgressComponent);
    return OverviewTrackingProgressComponent;
}());
exports.OverviewTrackingProgressComponent = OverviewTrackingProgressComponent;
//# sourceMappingURL=overview-tracking-progress.component.js.map