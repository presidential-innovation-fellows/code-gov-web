"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var hmr_1 = require('@angularclass/hmr');
var angulartics2_1 = require('angulartics2');
var providers_1 = require('angulartics2/dist/providers');
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = require('./environment');
var app_routes_1 = require('./app.routes');
// App is our top level component
var app_resolver_1 = require('./app.resolver');
var external_link_1 = require('./directives/external-link');
var toggle_menu_1 = require('./directives/toggle-menu');
var language_icon_1 = require('./pipes/language-icon');
var pluralize_1 = require('./pipes/pluralize');
var truncate_1 = require('./pipes/truncate');
var app_components_1 = require('./utils/app-components');
var is_defined_1 = require('./pipes/is-defined');
var app_components_2 = require('./utils/app-components');
var agency_1 = require('./services/agency');
var mobile_1 = require('./services/mobile');
var modal_1 = require('./services/modal');
var repos_1 = require('./services/repos');
var seo_1 = require('./services/seo');
var state_1 = require('./services/state');
// Application wide providers
var APP_PROVIDERS = app_resolver_1.APP_RESOLVER_PROVIDERS.concat([
    agency_1.AgencyService,
    mobile_1.MobileService,
    modal_1.ModalService,
    repos_1.ReposService,
    seo_1.SeoService,
    state_1.StateService
]);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appRef) {
        this.appRef = appRef;
    }
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // recreate elements
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // remove styles
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrOnInit = function (store) {
        console.log('HMR store', store);
    };
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                angulartics2_1.Angulartics2Module.forRoot(),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: true })
            ],
            declarations: [
                app_components_2.APP_COMPONENTS,
                external_link_1.ExternalLinkDirective,
                language_icon_1.LanguageIconPipe,
                pluralize_1.PluralizePipe,
                is_defined_1.IsDefinedPipe,
                toggle_menu_1.ToggleMenuDirective,
                truncate_1.TruncatePipe
            ],
            providers: [
                providers_1.Angulartics2GoogleTagManager,
                environment_1.ENV_PROVIDERS,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                APP_PROVIDERS
            ],
            bootstrap: [app_components_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ApplicationRef])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map