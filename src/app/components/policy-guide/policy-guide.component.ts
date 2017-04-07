import { Component } from '@angular/core';
import { StateService } from '../../services/state';

@Component({
  selector: 'policy-guide',
  styleUrls: ['./policy-guide.style.scss'],
  templateUrl: './policy-guide.template.html'
})
export class PolicyGuideComponent {

  constructor(public stateService: StateService) {
    this.stateService.set('section', 'policy-guide');
  }
}
