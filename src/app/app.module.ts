import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth} from 'angular2-jwt';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
// App is our top level component
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ExternalLinkDirective } from './directives/external-link';
import { ToggleMenuDirective } from './directives/toggle-menu';
import { AppPipesModule } from './pipes';
import { AppComponent } from './utils/app-components';
import { APP_COMPONENTS } from './utils/app-components';
import { AgencyService, AGENCIES } from './services/agency';
import { MobileService } from './services/mobile';
import { ModalService } from './services/modal';
import { ReposService } from './services/repos';
import { SeoService } from './services/seo';
import { StateService } from './services/state';

import { ModalModule } from './components/modal'

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AgencyService,
  MobileService,
  ModalService,
  ReposService,
  SeoService,
  StateService
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    ModalModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    AppPipesModule
  ],
  declarations: [
    APP_COMPONENTS,
    ExternalLinkDirective,
    ToggleMenuDirective,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    APP_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}
