import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth} from 'angular2-jwt';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ExternalLinkDirective } from './directives/external-link';
import { ToggleMenuDirective } from './directives/toggle-menu';
import { LanguageIconPipe } from './pipes/language-icon';
import { PluralizePipe } from './pipes/pluralize';
import { TruncatePipe } from './pipes/truncate';
import { AppComponent } from './utils/app-components';
import { IsDefinedPipe } from './pipes/is-defined';
import { APP_COMPONENTS } from './utils/app-components';
import { AgencyService, AGENCIES } from './services/agency';
import { MobileService } from './services/mobile';
import { ModalService } from './services/modal';
import { ReposService } from './services/repos';
import { SeoService } from './services/seo';
import { StateService } from './services/state';

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
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  declarations: [
    APP_COMPONENTS,
    ExternalLinkDirective,
    LanguageIconPipe,
    PluralizePipe,
    IsDefinedPipe,
    ToggleMenuDirective,
    TruncatePipe
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    APP_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrOnInit(store) {
    console.log('HMR store', store);
  }
}
