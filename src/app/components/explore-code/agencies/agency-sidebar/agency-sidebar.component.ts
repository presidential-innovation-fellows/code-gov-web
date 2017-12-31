import { Component } from '@angular/core';
import { AgencyService, Agency } from '../../../../services/agency';

@Component({
  selector: 'agency-sidebar',
  styles: [require('./agency-sidebar.style.scss')],
  template: require('./agency-sidebar.template.html')
})

export class AgencySidebarComponent {
  agencies: Agency[];

  constructor(
    private agencyService: AgencyService
  ) {
  }

  ngOnInit() {
    this.agencies = this.agencyService.getAgencies();
  }

  getIcon(agency) {
    return `assets/img/logos/agencies/${agency.id}-50x50.png`;
  }
}
