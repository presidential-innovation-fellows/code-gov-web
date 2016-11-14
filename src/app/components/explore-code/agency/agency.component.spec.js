"use strict";
var _this = this;
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var testing_1 = require('@angular/core/testing');
var Rx_1 = require('rxjs/Rx');
var index_1 = require('./index');
var agency_1 = require('../../../services/agency');
var language_icon_1 = require('../../../pipes/language-icon');
var pluralize_1 = require('../../../pipes/pluralize');
var repos_1 = require('../../../services/repos');
var seo_1 = require('../../../services/seo');
var truncate_1 = require('../../../pipes/truncate');
describe('AgencyComponent', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                index_1.AgencyComponent,
                language_icon_1.LanguageIconPipe,
                pluralize_1.PluralizePipe,
                truncate_1.TruncatePipe
            ],
            imports: [
                http_1.HttpModule,
                router_1.RouterModule
            ],
            providers: [
                agency_1.AgencyService,
                repos_1.ReposService,
                seo_1.SeoService,
                { provide: router_1.ActivatedRoute, useClass: MockActivatedRoute }
            ]
        });
        _this.fixture = testing_1.TestBed.createComponent(index_1.AgencyComponent);
        _this.agencyComponent = _this.fixture.componentInstance;
    });
    describe('checkRepos', function () {
        it('returns false when repos do not exist', function () {
            var repos = [];
            expect(_this.agencyComponent.checkRepos(repos)).toBe(false);
        });
        it('returns true when repos exist', function () {
            var repos = [{ id: 1, name: 'Repo' }];
            expect(_this.agencyComponent.checkRepos(repos)).toBe(true);
        });
    });
    describe('filterByAgency', function () {
        it('returns false when a repo’s Agency does not match', function () {
            spyOn(_this.agencyComponent, 'agencyId').and.returnValue('DOL');
            var repo = { agency: 'AAA' };
            expect(_this.agencyComponent.filterByAgency(repo)).toBe(false);
        });
        it('returns true when a repo’s Agency matches', function () {
            spyOn(_this.agencyComponent, 'agencyId').and.returnValue('DOL');
            var repo = { agency: 'DOL' };
            expect(_this.agencyComponent.filterByAgency(repo)).toBe(true);
        });
    });
    describe('destroy', function () {
        it('should unsubscribe from router events on destroy', function () {
            _this.fixture.detectChanges();
            spyOn(_this.agencyComponent.eventSub, 'unsubscribe');
            _this.fixture.destroy();
            expect(_this.agencyComponent.eventSub.unsubscribe).toHaveBeenCalled();
        });
    });
});
var MockActivatedRoute = (function (_super) {
    __extends(MockActivatedRoute, _super);
    function MockActivatedRoute() {
        _super.call(this);
        this.params = Rx_1.Observable.of({ id: 'DOL' });
    }
    return MockActivatedRoute;
}(router_1.ActivatedRoute));
//# sourceMappingURL=agency.component.spec.js.map