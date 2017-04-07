import { Component } from '@angular/core';

import { MobileService } from '../../../../services/mobile';

@Component({
  selector: 'compliance',
  templateUrl: './compliance.template.html'
})

export class ComplianceComponent {

  constructor(private mobileService: MobileService) {
    this.mobileService.hideMenu();
  }
}
