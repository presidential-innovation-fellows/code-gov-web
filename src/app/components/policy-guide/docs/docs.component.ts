import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MobileService } from '../../../services/mobile';

@Component({
  selector: 'docs',
  styleUrls: ['./docs.style.scss'],
  templateUrl: './docs.template.html',
  encapsulation: ViewEncapsulation.None
})
export class DocsComponent implements OnDestroy {
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
