import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

@Injectable()

export class MobileService {
  active: boolean;
  private mobileMenuActive = new Subject<boolean>();
  activeMobileMenu$:Observable<boolean> = this.mobileMenuActive.asObservable();

  constructor() {
    this.active = false;
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
