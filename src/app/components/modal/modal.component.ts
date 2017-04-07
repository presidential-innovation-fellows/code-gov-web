import { Angulartics2 } from 'angulartics2';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../services/modal';

@Component({
  selector: 'modal',
  styles: ['./modal.style.scss'],
  templateUrl: './modal.template.html'
})

export class ModalComponent implements OnDestroy {
  description: string;
  title: string;
  url: string;
  visible: boolean;
  modalSub: Subscription;

  constructor(
    private angulartics2: Angulartics2,
    private modalService: ModalService
  ) {
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
    this.angulartics2.eventTrack.next({ action: 'Close', properties: { category: 'Modal' }});
    this.visible = false;
  }
}
