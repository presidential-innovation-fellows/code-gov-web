import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Angulartics2On } from 'angulartics2';
import { Angulartics2Module, Angulartics2GoogleTagManager } from 'angulartics2';

import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { NgxPaginationModule } from 'ngx-pagination';

import { MetaModule } from '@ngx-meta/core';

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
import { AgencyApiService } from './services/agency-api';
import { AgenciesIndexService, ReleasesIndexService } from './services/indexes';
import { MobileService } from './services/mobile';
import { ModalService } from './services/modal';
import { RepoService } from './services/repo';
import { ReposService } from './services/repos';
import { ElasticsearchSearchService, LunrSearchService, SearchService } from './services/search';
import { SeoService } from './services/seo';
import { StateService } from './services/state';
import { StatusService } from './services/status';
import { MonacoEditorService } from './components/monaco-editor';
import { ElasticsearchTermService, LunrTermService, TermService } from './services/term';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AgenciesIndexService,
  AgencyService,
  AgencyApiService,
  MobileService,
  ModalService,
  MonacoEditorService,
  ReleasesIndexService,
  RepoService,
  ReposService,
  { provide: SearchService, useClass: LunrSearchService },
  SeoService,
  StateService,
  StatusService,
  { provide: TermService, useClass: LunrTermService },
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  imports: [ // import Angular's modules
    Angulartics2Module.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InfiniteScrollModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    Ng2PageScrollModule,
    MetaModule.forRoot(),
    NgxPaginationModule,
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
    APP_PROVIDERS,
    Angulartics2GoogleTagManager
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
