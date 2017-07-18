import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MobileService } from '../../services/mobile';

@Component({
  selector: 'sidebar',
  styles: [require('./sidebar.style.scss')],
  template: require('./sidebar.template.html'),
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnDestroy, AfterViewInit {
  menuActive: boolean;
  activeMenuSub: Subscription;
  showTitle: boolean;
  @ViewChild('sidebarTitle') sidebarTitle: ElementRef;

  constructor(
    private mobileService: MobileService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.menuActive = false;
    this.showTitle = true;

    this.activeMenuSub = mobileService.activeMobileMenu$.subscribe(
      menuStatus => {
        this.menuActive = menuStatus;
      }
    );
  }

  ngAfterViewInit() {
    this.showTitle = this.sidebarTitle.nativeElement.children.length > 0;
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    if (this.activeMenuSub) this.activeMenuSub.unsubscribe();
  }
}
