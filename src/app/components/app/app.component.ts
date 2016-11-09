import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StateService } from '../../services/state';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./app.style.scss')],
  template: require('./app.template.html')
})

export class AppComponent implements OnInit, OnDestroy {
  eventSub: Subscription;

  constructor(
    private router: Router,
    public stateService: StateService
  ) {}

  ngOnInit() {
    this.eventSub = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });
  }

  ngOnDestroy() {
    if (this.eventSub) this.eventSub.unsubscribe();
  }
}
