"use strict";
var _this = this;
var testing_1 = require('@angular/core/testing');
var modal_component_1 = require('./modal.component');
var modal_1 = require('../../services/modal');
var platform_browser_1 = require('@angular/platform-browser');
describe('ModalComponent', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                modal_component_1.ModalComponent
            ],
            providers: [
                modal_1.ModalService
            ]
        });
        _this.fixture = testing_1.TestBed.createComponent(modal_component_1.ModalComponent);
        _this.modalComponent = _this.fixture.componentInstance;
        _this.modalService = _this.modalComponent.modalService;
    });
    it('should display a title in h1 when component\'s title property is set', function () {
        // Call ModalService.showModal() to push an Object through the modalActivated$
        // Observable since ModalComponent subscribes to that Obesrvable to get the value of
        // its title property. In this case, the title is set to 'Foobar', which means that
        // 'Foobar' will be displayed when the title property is interpolated in the
        // component template (line 9).
        var newTitle = 'Foobar';
        _this.modalService.showModal({ description: undefined, title: newTitle, url: undefined });
        _this.fixture.detectChanges();
        var element = _this.fixture.debugElement.query(platform_browser_1.By.css('h1'));
        expect(element.nativeElement.innerHTML).toBe(newTitle);
        expect(_this.modalComponent.visible).toBeTruthy();
    });
    it('should NOT display a title or h1 tag when component\'s title property is set ' +
        'to undefined', function () {
        // Call ModalService.showModal() to push an Object through the modalActivated$
        // Observable since ModalComponent subscribes to that Obesrvable to get the value
        // of its title property. In this case, the title pushed through the Observable
        // is undefined, which means that the title element (<h1>) will be null in the
        // template due to the *ngIf on line 8.
        var newTitle = undefined;
        _this.modalService.showModal({ description: undefined, title: newTitle, url: undefined });
        _this.fixture.detectChanges();
        // undefined title means that h1 will not be present
        var element = _this.fixture.debugElement.query(platform_browser_1.By.css('h1'));
        expect(element).toBeNull();
    });
    it('should display a description when component\'s description property is set', function () {
        // Call ModalService.showModal() to push an Object through the modalActivated$
        // Observable since ModalComponent subscribes to that Obesrvable to get the value
        // of its desdcription property. In this case, the description is set to
        // 'Modal Desc', which means that 'Modal Desc' will be displayed when the
        // description property is interpolated in the component template (line 12).
        var newDesc = 'Modal Desc';
        _this.modalService.showModal({ description: newDesc, title: undefined, url: undefined });
        _this.fixture.detectChanges();
        var element = _this.fixture.debugElement.query(platform_browser_1.By.css('.modal-content'));
        expect(element.nativeElement.children[0].innerHTML).toBe(newDesc);
    });
    it('should show a url link when component\'s url property is set', function () {
        // Call ModalService.showModal() to push an Object through the modalActivated$
        // Observable since ModalComponent subscribes to that Obesrvable to get the
        // value of its url property. In this case, the description is set to
        // 'http://foo.bar/', which means that 'http://foo.bar/' will be the anchor
        // link when the url property is interpolated in the component template (line 14).
        var newUrl = 'http://foo.bar/';
        _this.modalService.showModal({ description: undefined, title: undefined, url: newUrl });
        _this.fixture.detectChanges();
        var element = _this.fixture.debugElement.query(platform_browser_1.By.css('a'));
        expect(element.nativeElement.href).toBe(newUrl);
    });
    it('should no longer be visible when ModalComponent.close() is called.', function () {
        // Call ModalService.showModal() to push an item into the modalActivated$ Observable. All values
        // are undefined since we are only concerned about the visible property that is set
        // in the subscribe() call in the ModalComponent constructor (line 23).
        _this.modalService.showModal({ description: undefined, title: undefined, url: undefined });
        _this.fixture.detectChanges();
        // close the modal, which sets ModalComponent.visible to false
        _this.modalComponent.close();
        _this.fixture.detectChanges();
        // Since the visible property is false, the *ngIf on line 1 of the template means that
        // the root div element will be null.
        var element = _this.fixture.debugElement.query(platform_browser_1.By.css('.overlay'));
        expect(element).toBeNull();
        // Check that the ModalComponent.close() call sets the visible property to false.
        expect(_this.modalComponent.visible).toBeFalsy();
    });
    describe('destroy', function () {
        it('should unsubscribe from router events on destroy', function () {
            _this.fixture.detectChanges();
            spyOn(_this.modalComponent.modalSub, 'unsubscribe');
            _this.fixture.destroy();
            expect(_this.modalComponent.modalSub.unsubscribe).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=modal.component.spec.js.map