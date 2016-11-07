import { inject, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ModalService } from '../../services/modal';

import {By} from '@angular/platform-browser';

describe('ModalComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent
      ],
      providers: [
        ModalService
      ]
    });

    this.fixture = TestBed.createComponent(ModalComponent);
    this.modalComponent = this.fixture.componentInstance;
    this.modalService = this.modalComponent.modalService;
  });

  it('should have a title set in the template when ModalService.modalActivated$.next() is ' +
    'called with an object containing a title property with a valid ' +
    'value (not undefined)', () => {
    // Call ModalService.showModal() to push an Object through the modalActivated$
    // Observable since ModalComponent subscribes to that Obesrvable to get the value of its title property.
    // In this case, the title is set to 'Foobar', which means that 'Foobar' will be displayed
    // when the title property is interpolated in the component template (line 9).
    let newTitle = 'Foobar';
    this.modalService.showModal({description: undefined, title: newTitle, url: undefined});
    this.fixture.detectChanges();
    let element = this.fixture.debugElement.query(By.css('h1'));

    expect(element.nativeElement.innerHTML).toBe(newTitle);
    expect(this.modalComponent.visible).toBeTruthy();
  });

  it('should NOT have a title set in the template when ModalService.modalActivated$.next() is ' +
    'called with an object containing a title property with an undefined value', () => {
    // Call ModalService.showModal() to push an Object through the modalActivated$
    // Observable since ModalComponent subscribes to that Obesrvable to get the value of its title property.
    // In this case, the title pushed through the Observable is undefined, which means that the title
    // element (<h1>) will be null in the template due to the *ngIf on line 8.
    let newTitle = undefined;
    this.modalService.showModal({description: undefined, title: newTitle, url: undefined});
    this.fixture.detectChanges();
    // undefined title means that h1 will not be present
    let element = this.fixture.debugElement.query(By.css('h1'));

    expect(element).toBeNull();
  });

  it('should have a description set in the template when ModalService.modalActivated$.next() is ' +
    'called with an object containing a description property with a valid ' +
    'value (not undefined)', () => {
    // Call ModalService.showModal() to push an Object through the modalActivated$
    // Observable since ModalComponent subscribes to that Obesrvable to get the value of its desdcription property.
    // In this case, the description is set to 'Modal Desc', which means that 'Modal Desc' will be displayed
    // when the description property is interpolated in the component template (line 12).
    let newDesc = 'Modal Desc';
    this.modalService.showModal({description: newDesc, title: undefined, url: undefined});
    this.fixture.detectChanges();
    let element = this.fixture.debugElement.query(By.css('.modal-content'));

    expect(element.nativeElement.children[0].innerHTML).toBe(newDesc);
  });

  it('should have a url set in the template when ModalService.modalActivated$.next() is ' +
    'called with an object containing a url property with a valid ' +
    'value (not undefined)', () => {
    // Call ModalService.showModal() to push an Object through the modalActivated$
    // Observable since ModalComponent subscribes to that Obesrvable to get the value of its url property.
    // In this case, the description is set to 'http://foo.bar/', which means that 'http://foo.bar/' will be
    // the anchor link when the url property is interpolated in the component template (line 14).
    let newUrl = 'http://foo.bar/';
    this.modalService.showModal({description: undefined, title: undefined, url: newUrl});
    this.fixture.detectChanges();

    let element = this.fixture.debugElement.query(By.css('a'));

    expect(element.nativeElement.href).toBe(newUrl);
  });

  it('should no longer be visible in the template since ModalComponent.close() sets the visible property to false.', () => {
    // Call ModalService.showModal() to push an item into the modalActivated$ Observable. All values
    // are undefined since we are only concerned about the visible property that is set
    // in the subscribe() call in the ModalComponent constructor (line 23).
    this.modalService.showModal({description: undefined, title: undefined, url: undefined});
    this.fixture.detectChanges();
    // close the modal, which sets ModalComponent.visible to false
    this.modalComponent.close();
    this.fixture.detectChanges();
    // Since the visible property is false, the *ngIf on line 1 of the template means that
    // the root div element will be null.
    let element = this.fixture.debugElement.query(By.css('.overlay'));

    expect(element).toBeNull();
    // Check that the ModalComponent.close() call sets the visible property to false.
    expect(this.modalComponent.visible).toBeFalsy();
  });

});
