"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var SeoService = (function () {
    function SeoService(titleService) {
        this.baseTitle = '· Code.gov';
        this.titleService = titleService;
        this.DOM = dom_adapter_1.getDOM();
        this.headElement = this.DOM.query('head');
        this.metaDescription = this.getOrCreateMetaElement('description');
        this.robots = this.getOrCreateMetaElement('robots');
    }
    SeoService.prototype.getTitle = function () {
        return this.titleService.getTitle();
    };
    SeoService.prototype.setTitle = function (newTitle, baseTitle) {
        if (baseTitle === void 0) { baseTitle = false; }
        if (baseTitle === true)
            newTitle += ' · Code.gov';
        this.titleService.setTitle(newTitle);
    };
    SeoService.prototype.getMetaDescription = function () {
        return this.metaDescription.getAttribute('content');
    };
    SeoService.prototype.setMetaDescription = function (description) {
        this.metaDescription.setAttribute('content', description);
    };
    SeoService.prototype.getMetaRobots = function () {
        return this.robots.getAttribute('content');
    };
    SeoService.prototype.setMetaRobots = function (robots) {
        this.robots.setAttribute('content', robots);
    };
    SeoService.prototype.getOrCreateMetaElement = function (name) {
        var el;
        el = this.DOM.query('meta[name=' + name + ']');
        if (el === null) {
            el = this.DOM.createElement('meta');
            el.setAttribute('name', name);
            this.headElement.appendChild(el);
        }
        return el;
    };
    SeoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [platform_browser_1.Title])
    ], SeoService);
    return SeoService;
}());
exports.SeoService = SeoService;
//# sourceMappingURL=seo.service.js.map