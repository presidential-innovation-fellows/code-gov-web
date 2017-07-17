import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MobileService } from '../../services/mobile';

@Component({
  selector: 'sidebar',
  styles: [require('./sidebar.style.scss')],
  template: require('./sidebar.template.html'),
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnDestroy {
  menuActive: boolean;
  activeMenuSub: Subscription;

  constructor(private mobileService: MobileService) {
    this.menuActive = false;

    this.activeMenuSub = mobileService.activeMobileMenu$.subscribe(
      menuStatus => {
        this.menuActive = menuStatus;
      }
    );
  }

  ngOnDestroy() {
    if (this.activeMenuSub) this.activeMenuSub.unsubscribe();
  }
}
