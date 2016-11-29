import { Angulartics2, Angulartics2GoogleTagManager } from 'angulartics2';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StateService } from '../../services/state';
import { WindowRef } from './../../services/window/window.service';

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
    public stateService: StateService,
    private windowRef: WindowRef
  ) {}

  ngOnInit() {
    console.log('ngOnInit() called');
    this.eventSub = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        console.log('Event NOT instanceof NavigationEnd', evt);
        return;
      }
      console.log('Event instanceof NavigationEnd', evt);
      this.windowRef.nativeWindow.document.body.scrollTop = 0;
    });
  }

  ngOnDestroy() {
    if (this.eventSub) this.eventSub.unsubscribe();
  }
}
