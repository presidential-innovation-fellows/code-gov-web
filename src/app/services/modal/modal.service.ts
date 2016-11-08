import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

@Injectable()

export class ModalService {
   private modalActivation = new Subject<string>();
   // tslint:disable-next-line:member-ordering
   modalActivated$ = this.modalActivation.asObservable();


   showModal(modalData: any) {
     this.modalActivation.next(modalData);
   }
}
