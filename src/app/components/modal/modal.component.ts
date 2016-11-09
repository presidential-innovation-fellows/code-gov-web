import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../services/modal';

@Component({
  selector: 'modal',
  styles: [require('./modal.style.scss')],
  template: require('./modal.template.html')
})

export class ModalComponent implements OnDestroy {
  description: string;
  title: string;
  url: string;
  visible: boolean;
  modalSub: Subscription;

  constructor(private modalService: ModalService) {
    this.modalSub = modalService.modalActivated$.subscribe(
      modal => {
        this.description = modal['description'];
        this.title = modal['title'];
        this.url = modal['url'];
        this.visible = true;
      }
    );
  }

  ngOnDestroy() {
    if (this.modalSub) this.modalSub.unsubscribe();
  }

  close() {
    this.visible = false;
  }
}
