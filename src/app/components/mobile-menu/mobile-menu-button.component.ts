import {
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { MobileService } from '../../services/mobile';

@Component({
  selector: 'mobile-menu-button',
  styles: [
    require('./mobile-menu-button.style.scss'),
  ],
  template: require('./mobile-menu-button.template.html'),
  encapsulation: ViewEncapsulation.None,
})

export class MobileMenuButtonComponent {
  private _isOpen: boolean = false;

  constructor(
    private mobileService: MobileService,
  ) {
    this.mobileService.activeSideNav$.subscribe(isOpen => this._isOpen = isOpen);
  }

  toggleSideNav() {
    this.mobileService.toggleSideNav();
  }

  isOpen() {
    return this._isOpen;
  }
}
