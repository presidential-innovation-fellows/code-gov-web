import { HostListener } from '@angular/core';

export class BaseFilterSideNavComponent {

  isMobile: boolean;
  sideNavBarWidth: string = '0';

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 750) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
      this.sideNavBarWidth = '0';
    }
  }

  onShowFilter() {
    this.sideNavBarWidth = '100%';
  }

  onCloseNavBar() {
    this.sideNavBarWidth = '0';

  }
}
