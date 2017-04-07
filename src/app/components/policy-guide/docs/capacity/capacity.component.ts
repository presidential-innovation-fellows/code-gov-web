import { Component } from '@angular/core';

import { MobileService } from '../../../../services/mobile';

@Component({
  selector: 'capacity',
  templateUrl: './capacity.template.html'
})

export class CapacityComponent {

  constructor(private mobileService: MobileService) {
    this.mobileService.hideMenu();
  }
}
