"use strict";
var _this = this;
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var rxjs_1 = require('rxjs');
var external_link_directive_1 = require('./external-link.directive');
var modal_1 = require('../../services/modal');
describe('ExternalLinkDirective', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [external_link_directive_1.ExternalLinkDirective, TestComponent],
            providers: [{ provide: modal_1.ModalService, useClass: mockModalService }]
        });
        _this.fixture = testing_1.TestBed.createComponent(TestComponent);
        _this.fixture.detectChanges();
    });
    it('should trigger the ModalService when an external link is quicked', function () {
        var modalService = testing_1.TestBed.get(modal_1.ModalService);
        spyOn(modalService, 'showModal');
        _this.fixture.debugElement.nativeElement.querySelector('#ext-link').click();
        expect(modalService.showModal).toHaveBeenCalled();
    });
    it('should do nothing when a .gov is clicked', function () {
        var modalService = testing_1.TestBed.get(modal_1.ModalService);
        spyOn(modalService, 'showModal');
        _this.fixture.debugElement.nativeElement.querySelector('#gov-link').click();
        expect(modalService.showModal).not.toHaveBeenCalled();
    });
    it('should do nothing when a .mil is clicked', function () {
        var modalService = testing_1.TestBed.get(modal_1.ModalService);
        spyOn(modalService, 'showModal');
        _this.fixture.debugElement.nativeElement.querySelector('#mil-link').click();
        expect(modalService.showModal).not.toHaveBeenCalled();
    });
});
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test',
            template: "\n      <a external-link id=\"gov-link\" href=\"https://code.gov\" target=\"_blank\">Code.gov</a>\n      <a external-link id=\"mil-link\" href=\"https://code.mil\" target=\"_blank\">Code.mil</a>\n      <a external-link id=\"ext-link\" href=\"https://github.com\" target=\"_blank\">GitHub</a>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
}());
var mockModalService = (function () {
    function mockModalService() {
    }
    mockModalService.prototype.showModal = function (data) {
        return rxjs_1.Observable.of({});
    };
    return mockModalService;
}());
//# sourceMappingURL=external-link.directive.spec.js.map