import { Component } from '@angular/core';

import { MobileService } from '../../../services/mobile';

@Component({
  selector: 'agencies',
  styleUrls: ['./agencies.style.scss'],
  templateUrl: './agencies.template.html'
})

export class AgenciesComponent {

  constructor(private mobileService: MobileService) {
    this.mobileService.hideMenu();
  }
}
