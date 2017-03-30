import { Component, Input } from '@angular/core';

import { AgenciesComponent } from '../agencies';

@Component({
  selector: 'agency-list-item',
  styles: [require('./agency-list-item.style.scss')],
  template: require('./agency-list-item.template.html')
})

export class AgencyListItemComponent {
  @Input() agency;

  constructor() {}
}
