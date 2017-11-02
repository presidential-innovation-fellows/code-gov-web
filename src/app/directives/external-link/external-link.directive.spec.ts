import { Component, Directive } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';

import { Observable } from 'rxjs/Observable';
import { Angulartics2 } from 'angulartics2';

import { ExternalLinkDirective } from './external-link.directive';
import { ModalService } from '../../services/modal';

@Component({
  selector: 'test',
  template: `
    <a external-link id="gov-link" href="https://code.gov" target="_blank">Code.gov</a>
    <a external-link id="mil-link" href="https://code.mil" target="_blank">Code.mil</a>
    <a external-link id="ext-link" href="https://github.com" target="_blank">GitHub</a>
  `
})

class TestComponent {
}

class MockModalService {
  showModal(data: any) {
    return Observable.of({});
  }
}

describe('ExternalLinkDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalLinkDirective, TestComponent ],
      imports: [ RouterModule.forRoot([]) ],
      providers: [
        Angulartics2,
        { provide: Location, useClass: SpyLocation },
        { provide: ModalService, useClass: MockModalService }
      ]
    });

    this.fixture = TestBed.createComponent(TestComponent);
    this.fixture.detectChanges();
  });

  it('should trigger Angularitics when an external link is quicked', () => {
    let angulartics2 = TestBed.get(Angulartics2);
    spyOn(angulartics2.eventTrack, 'next');
    this.fixture.debugElement.nativeElement.querySelector('#ext-link').click();

    expect(angulartics2.eventTrack.next).toHaveBeenCalledWith(
      { action: 'Click', properties: { category: 'External Link' }}
    );
  });

  it('should trigger the ModalService when an external link is quicked', () => {
    let modalService = TestBed.get(ModalService);
    spyOn(modalService, 'showModal');
    this.fixture.debugElement.nativeElement.querySelector('#ext-link').click();

    expect(modalService.showModal).toHaveBeenCalled();
  });

  it('should do nothing when a .gov is clicked', () => {
    let modalService = TestBed.get(ModalService);
    spyOn(modalService, 'showModal');
    this.fixture.debugElement.nativeElement.querySelector('#gov-link').click();

    expect(modalService.showModal).not.toHaveBeenCalled();
  });

  it('should do nothing when a .mil is clicked', () => {
    let modalService = TestBed.get(ModalService);
    spyOn(modalService, 'showModal');
    this.fixture.debugElement.nativeElement.querySelector('#mil-link').click();

    expect(modalService.showModal).not.toHaveBeenCalled();
  });
});
