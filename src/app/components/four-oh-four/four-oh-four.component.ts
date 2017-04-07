import { Component } from '@angular/core';
import { StateService } from '../../services/state';

@Component({
  selector: 'four-oh-four',
  styleUrls: ['./four-oh-four.style.scss'],
  templateUrl: './four-oh-four.template.html'
})

export class FourOhFourComponent {
  constructor(public stateService: StateService) {
    this.stateService.set('section', 'four-oh-four');
  }
}
