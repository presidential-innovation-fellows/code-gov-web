import { Angulartics2 } from 'angulartics2';
import { Directive, ElementRef, Output, Renderer } from '@angular/core';
import * as URL from 'url-parse';

import { ModalService } from '../../services/modal';

@Directive({
  selector: '[external-link]',
  host: {
    '(click)': 'onClick($event)'
  }
})

export class ExternalLinkDirective {
  modalContent: Object;
  url: string;

  constructor(
    private angulartics2: Angulartics2,
    private el: ElementRef,
    private modalService: ModalService
  ) {
    this.modalContent = {
      description: 'But you probably knew that already.',
      description2: 'Continue to the link below:',
      title: 'You are now leaving Code.gov',
      url: ''
    };
  }

  isExternalLink(url) {
    let host = new URL(url).host;
    return !host.endsWith('.gov') && !host.endsWith('.mil');
  }

  onClick(event: any) {
    let url = this.el.nativeElement.getAttribute('href');

    this.angulartics2.eventTrack.next({
      action: 'Click',
      properties: { category: 'External Link' }
    });

    if (this.isExternalLink(url)) {
      event.preventDefault();
      this.modalContent['url'] = url;
      this.modalService.showModal(this.modalContent);
    }
  }
}
