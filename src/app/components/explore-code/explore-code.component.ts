import { Component } from '@angular/core';
import { StateService } from '../../services/state';

@Component({
  selector: 'explore-code',
  styleUrls: ['./explore-code.style.scss'],
  templateUrl: './explore-code.template.html'
})

export class ExploreCodeComponent {
  constructor(public stateService: StateService) {
    this.stateService.set('section', 'explore-code');
  }
}
