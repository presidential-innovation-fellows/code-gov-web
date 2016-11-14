"use strict";
var core_1 = require('@angular/core');
var modal_1 = require('../../services/modal');
var ExternalLinkDirective = (function () {
    function ExternalLinkDirective(el, modalService) {
        this.el = el;
        this.modalService = modalService;
        this.modalContent = {
            description: 'But you probably knew that already.',
            description2: 'Continue to the link below:',
            title: 'You are now leaving Code.gov',
            url: ''
        };
    }
    ExternalLinkDirective.prototype.isExternalLink = function (url) {
        return !this.url.match(/(.+\.)?([^.]+)\.(?:gov|mil)$/);
    };
    ExternalLinkDirective.prototype.onClick = function (event) {
        this.url = this.el.nativeElement.getAttribute('href');
        if (this.isExternalLink(this.url)) {
            event.preventDefault();
            this.modalContent['url'] = this.url;
            this.modalService.showModal(this.modalContent);
        }
    };
    ExternalLinkDirective = __decorate([
        core_1.Directive({
            selector: '[external-link]',
            host: {
                '(click)': 'onClick($event)'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, modal_1.ModalService])
    ], ExternalLinkDirective);
    return ExternalLinkDirective;
}());
exports.ExternalLinkDirective = ExternalLinkDirective;
//# sourceMappingURL=external-link.directive.js.map