"use strict";
var core_1 = require('@angular/core');
var seo_1 = require('../../../../../services/seo');
var ComplianceInventoryCodeComponent = (function () {
    function ComplianceInventoryCodeComponent(seoService) {
        this.seoService = seoService;
        seoService.setTitle('Creating your enterprise code inventory', true);
        seoService.setMetaDescription('Learn how to create your enterprise code inventory and read up on the code.json metadata schema.');
        seoService.setMetaRobots('Index, Follow');
    }
    ComplianceInventoryCodeComponent = __decorate([
        core_1.Component({
            selector: 'inventory-code',
            template: require('./compliance-inventory-code.template.html')
        }), 
        __metadata('design:paramtypes', [seo_1.SeoService])
    ], ComplianceInventoryCodeComponent);
    return ComplianceInventoryCodeComponent;
}());
exports.ComplianceInventoryCodeComponent = ComplianceInventoryCodeComponent;
//# sourceMappingURL=compliance-inventory-code.component.js.map