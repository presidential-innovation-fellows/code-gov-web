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

  it('should have a title', () => {
    let newTitle = 'Foobar';
    // call showModal to push an item into the modalActivated$ Observable
    this.modalService.showModal({description: undefined, title: newTitle, url: undefined});
    this.fixture.detectChanges();
    let element = this.fixture.debugElement.query(By.css('h1'));

    expect(element.nativeElement.innerHTML).toBe(newTitle);
    expect(this.modalComponent.visible).toBeTruthy();
  });

  it('should NOT have a title', () => {
    let newTitle = undefined;
    // call showModal to push an item into the modalActivated$ Observable
    this.modalService.showModal({description: undefined, title: newTitle, url: undefined});
    this.fixture.detectChanges();
    // undefined title means that h1 will not be present
    let element = this.fixture.debugElement.query(By.css('h1'));

    expect(element).toBeNull();
  });

  it('should have a description', () => {
    let newDesc = 'Modal Desc';
    // call showModal to push an item into the modalActivated$ Observable
    this.modalService.showModal({description: newDesc, title: undefined, url: undefined});
    this.fixture.detectChanges();
    let element = this.fixture.debugElement.query(By.css('.modal-content'));

    expect(element.nativeElement.children[0].innerHTML).toBe(newDesc);
  });

  it('should have a URL', () => {
    let newUrl = 'http://foo.bar/';
    // call showModal to push an item into the modalActivated$ Observable
    this.modalService.showModal({description: undefined, title: undefined, url: newUrl});
    this.fixture.detectChanges();

    let element = this.fixture.debugElement.query(By.css('a'));

    expect(element.nativeElement.href).toBe(newUrl);
  });

  it('should no longer be visible', () => {
    let newUrl = 'http://foo.bar/';
    // call showModal to push an item into the modalActivated$ Observable
    this.modalService.showModal({description: undefined, title: undefined, url: newUrl});
    this.fixture.detectChanges();
    // close the modal, which sets visible to false
    this.modalComponent.close();
    this.fixture.detectChanges();
    let element = this.fixture.debugElement.query(By.css('.overlay'));

    expect(element).toBeNull();
    expect(this.modalComponent.visible).toBeFalsy();
  });

});
