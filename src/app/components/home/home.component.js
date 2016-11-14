"use strict";
var core_1 = require('@angular/core');
var seo_1 = require('../../services/seo');
var state_1 = require('../../services/state');
var HomeComponent = (function () {
    function HomeComponent(stateService, seoService) {
        this.stateService = stateService;
        this.seoService = seoService;
        this.url = 'https://pif.gov';
        this.stateService.set('section', 'home');
        this.seoService.setTitle('Code.gov', false);
        this.seoService.setMetaDescription('Code.gov is a platform designed to improve access to the federal government’s custom-developed software.');
    }
    HomeComponent = __decorate([
        core_1.Component({
            // The selector is what angular internally uses
            // for `document.querySelectorAll(selector)` in our index.html
            // where, in this case, selector is the string 'home'
            selector: 'home',
            styles: [require('./home.style.scss')],
            template: require('./home.template.html')
        }), 
        __metadata('design:paramtypes', [state_1.StateService, seo_1.SeoService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map