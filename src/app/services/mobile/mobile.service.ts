import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class MobileService {
  active: boolean;
  activeMobileMenu$: Observable<boolean>;
  private mobileMenuActive = new Subject<boolean>();

  constructor() {
    this.active = false;
    this.activeMobileMenu$ = this.mobileMenuActive.asObservable();
  }

  changeMenuStatus() {
    this.mobileMenuActive.next(this.active);
  }

  hideMenu() {
    this.active = false;
    this.changeMenuStatus();
  }

  toggleMenu() {
   this.active = !this.active;
   this.changeMenuStatus();
  }
}
