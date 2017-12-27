import { Component, Input } from '@angular/core';

@Component({
  selector: 'agency-list-item',
  styles: [require('./agency-list-item.styles.scss')],
  template: require('./agency-list-item.template.html')
})

export class AgencyListItemComponent {
  @Input() agency;

  constructor() {}

  getIcon() {
    return `assets/img/logos/agencies/${this.agency.id}-50x50.png`;
  }
}
