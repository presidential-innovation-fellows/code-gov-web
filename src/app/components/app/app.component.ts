import { Angulartics2, Angulartics2GoogleTagManager } from 'angulartics2';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PageScrollConfig } from 'ng2-page-scroll';

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
    private angulartics2: Angulartics2,
    private angulartics2Gtm: Angulartics2GoogleTagManager,
    private router: Router,
    public stateService: StateService
  ) {
     PageScrollConfig.defaultDuration = 0;
  }

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
