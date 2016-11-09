import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AgencyService, Agency } from '../../../../services/agency';
import { MobileService } from '../../../../services/mobile';

@Component({
  selector: 'agency-sidebar',
  styles: [require('./agency-sidebar.style.scss')],
  template: require('./agency-sidebar.template.html')
})

export class AgencySidebarComponent {
  menuActive: Observable<boolean>;
  agencies: Agency[];

  constructor(
    private agencyService: AgencyService,
    private mobileService: MobileService) {

    this.menuActive = mobileService.activeMobileMenu$;
  }

  ngOnInit() {
    this.agencies = this.agencyService.getAgencies();
  }
}
