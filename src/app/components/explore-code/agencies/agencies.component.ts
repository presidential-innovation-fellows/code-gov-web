import { Component } from '@angular/core';

import { MobileService } from '../../../services/mobile';

@Component({
  selector: 'agencies',
  styles: [require('./agencies.style.scss')],
  template: require('./agencies.template.html')
})

export class AgenciesComponent {

  constructor(private mobileService: MobileService) {
    this.mobileService.hideMenu();
  }
}
