"use strict";
var core_1 = require('@angular/core');
var seo_1 = require('../../../../../services/seo');
var CapacityResourcesComponent = (function () {
    function CapacityResourcesComponent(seoService) {
        this.seoService = seoService;
        seoService.setTitle('Tools and Resources', true);
        seoService.setMetaDescription('A growing list of tools and resources that agencies can use to share and open source their code.');
        seoService.setMetaRobots('Index, Follow');
    }
    CapacityResourcesComponent = __decorate([
        core_1.Component({
            selector: 'resources',
            template: require('./capacity-resources.template.html')
        }), 
        __metadata('design:paramtypes', [seo_1.SeoService])
    ], CapacityResourcesComponent);
    return CapacityResourcesComponent;
}());
exports.CapacityResourcesComponent = CapacityResourcesComponent;
//# sourceMappingURL=capacity-resources.component.js.map