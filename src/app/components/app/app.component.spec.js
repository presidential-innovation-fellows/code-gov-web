"use strict";
var _this = this;
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var testing_1 = require('@angular/core/testing');
var index_1 = require('./index');
var agency_1 = require('../../services/agency');
var language_icon_1 = require('../../pipes/language-icon');
var pluralize_1 = require('../../pipes/pluralize');
var repos_1 = require('../../services/repos');
var seo_1 = require('../../services/seo');
var truncate_1 = require('../../pipes/truncate');
var state_1 = require('../../services/state');
describe('AgencyComponent', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                index_1.AppComponent,
                language_icon_1.LanguageIconPipe,
                pluralize_1.PluralizePipe,
                truncate_1.TruncatePipe
            ],
            imports: [
                http_1.HttpModule,
                router_1.RouterModule.forRoot([])
            ],
            providers: [
                agency_1.AgencyService,
                repos_1.ReposService,
                seo_1.SeoService,
                state_1.StateService,
                { provide: common_1.APP_BASE_HREF, useValue: '/' }
            ]
        });
        _this.fixture = testing_1.TestBed.createComponent(index_1.AppComponent);
        _this.appComponent = _this.fixture.componentInstance;
    });
    describe('destroy', function () {
        it('should unsubscribe from router events on destroy', function () {
            _this.fixture.detectChanges();
            spyOn(_this.appComponent.eventSub, 'unsubscribe');
            _this.fixture.destroy();
            expect(_this.appComponent.eventSub.unsubscribe).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=app.component.spec.js.map