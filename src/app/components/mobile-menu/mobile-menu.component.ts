import {
  Component,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  Subscription,
} from 'rxjs/Subscription';

import { AgencyService } from '../../services/agency';
import { MobileService } from '../../services/mobile';

@Component({
  selector: 'mobile-menu',
  styles: [
    require('./mobile-menu.style.scss'),
  ],
  template: require('./mobile-menu.template.html'),
})

export class MobileMenuComponent {
  public sideNavSubscription: Subscription;
  public searchQuery: string = '';
  private isOpen: boolean = false;
  private openAccordions: object = {};
  private agencies = [];

  constructor(
    public mobileService: MobileService,
    public router: Router,
    private route: ActivatedRoute,
    private agencyService: AgencyService,
  ) {
    this.sideNavSubscription = this.mobileService.activeSideNav$.subscribe(isOpen => this.isOpen = isOpen);

    this.openAccordions = {
      '/explore-code/agencies': router.isActive('/explore-code/agencies', false),
      '/policy-guide/docs': router.isActive('/policy-guide/docs', false),
      '/policy-guide/docs/overview': router.isActive('/policy-guide/docs/overview', false),
      '/policy-guide/docs/compliance': router.isActive('/policy-guide/docs/compliance', false),
      '/policy-guide/docs/open-source': router.isActive('/policy-guide/docs/open-source', false),
    };

    this.agencies = this.agencyService.getAgencies();
  }

  ngOnDestroy() {
    this.sideNavSubscription.unsubscribe();
  }

  /**
   * Navigate to the search results page.
   *
   * @return {void}
   */
  search() {
    this.mobileService.hideSideNav();
    this.router.navigateByUrl('/search?q=' + this.searchQuery);
  }

  hideSideNav() {
    this.mobileService.hideSideNav();
  }

  toggleAccordion(name) {
    this.openAccordions[name] = !this.openAccordions[name];
  }
}
