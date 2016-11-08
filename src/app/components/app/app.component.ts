import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { StateService } from '../../services/state';

@Component({
  selector: 'app',
 // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.style.scss'],
  templateUrl: './app.template.html'
})

export class AppComponent {
  constructor(
    private router: Router,
    public stateService: StateService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });
  }
}
