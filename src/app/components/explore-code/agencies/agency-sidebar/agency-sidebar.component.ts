import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AgencyService, Agency } from '../../../../services/agency';
import { MobileService } from '../../../../services/mobile';

@Component({
  selector: 'agency-sidebar',
  styleUrls: ['./agency-sidebar.style.scss'],
  templateUrl: './agency-sidebar.template.html'
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
