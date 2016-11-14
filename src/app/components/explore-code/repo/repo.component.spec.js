"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var testing_2 = require('@angular/router/testing');
var Rx_1 = require('rxjs/Rx');
var agency_1 = require('../../../services/agency');
var external_link_1 = require('../../../directives/external-link');
var index_1 = require('./index');
var repos_1 = require('../../../services/repos');
var seo_1 = require('../../../services/seo');
var language_icon_pipe_1 = require('./../../../pipes/language-icon/language-icon.pipe');
var truncate_pipe_1 = require('./../../../pipes/truncate/truncate.pipe');
var modal_component_1 = require('./../../modal/modal.component');
var activity_list_component_1 = require('./../activity-list/activity-list.component');
var modal_service_1 = require('./../../../services/modal/modal.service');
var is_defined_pipe_1 = require('./../../../pipes/is-defined/is-defined.pipe');
// set test repository id used throughout to Dept of Veterans Affairs
var id = '33202667';
/**
 * Unit tests for RepoComponent.
 *
 */
describe('RepoComponent', function () {
    var fixture;
    var repoComponent;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                // This hack is needed because there is a routerLink in the template
                testing_2.RouterTestingModule.withRoutes([
                    { path: 'explore-code/agencies/:id', component: DummyRoutingComponent }
                ])
            ],
            declarations: [
                external_link_1.ExternalLinkDirective,
                language_icon_pipe_1.LanguageIconPipe,
                truncate_pipe_1.TruncatePipe,
                activity_list_component_1.ActivityListComponent,
                modal_component_1.ModalComponent,
                index_1.RepoComponent,
                DummyRoutingComponent,
                is_defined_pipe_1.IsDefinedPipe
            ],
            providers: [
                agency_1.AgencyService,
                repos_1.ReposService,
                modal_service_1.ModalService,
                seo_1.SeoService,
                { provide: router_1.ActivatedRoute, useClass: MockActivatedRoute }
            ]
        });
        fixture = testing_1.TestBed.createComponent(index_1.RepoComponent);
        repoComponent = fixture.componentInstance;
    });
    it('should initialize repo property when getJsonagency.id property is set', testing_1.inject([agency_1.AgencyService, repos_1.ReposService], function (agencyService, reposService) {
        // setup dependencies
        var agency = { id: 'VA', name: 'Department of Veterans Affairs' };
        spyOn(agencyService, 'getAgency').and.returnValue(agency);
        var repo = createRepository({ name: 'Fake repo name' });
        spyOn(reposService, 'getJsonFile').and.returnValue(Rx_1.Observable.of(repo));
        fixture.detectChanges();
        expect(repoComponent.repo).toBeDefined();
        // also checking on agency object after call to AgencyService.getAgancy()
        expect(repoComponent.repo.agency.id).toEqual(agency.id);
        // console.log("Agency: ", repoComponent.repo.agency);
    }));
    it('should NOT initialize repo property if id property is bogus', testing_1.inject([agency_1.AgencyService, repos_1.ReposService], function (agencyService, reposService) {
        var agency = { id: 'VA', name: 'Department of Veterans Affairs' };
        spyOn(agencyService, 'getAgency').and.returnValue(agency);
        var repos = undefined;
        spyOn(reposService, 'getJsonFile').and.returnValue(Rx_1.Observable.of(repos));
        // instantiate a new RepoComponent so that ngOnInit() doesn't get called
        var newRepoComponent = new index_1.RepoComponent(null, agencyService, reposService, null);
        // call getRepo() that invokes reposService.getJsonFile()
        newRepoComponent.getRepo('');
        expect(newRepoComponent.repo).toBeUndefined();
    }));
    it('should call seoService.setMetaDescription() when repository is returned ' +
        ' when reposService.getJsonFile() returns a repository', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        var agency = { id: 'VA', name: 'Department of Veterans Affairs' };
        spyOn(agencyService, 'getAgency').and.returnValue(agency);
        var repo = createRepository({ name: 'Another Fake repo name' });
        spyOn(reposService, 'getJsonFile').and.returnValue(Rx_1.Observable.of(repo));
        spyOn(seoService, 'setMetaDescription');
        fixture.detectChanges();
        expect(repoComponent.repo).toBeDefined();
        expect(seoService.setMetaDescription).toHaveBeenCalled();
    }));
    it('should display repoUrl in template if repo.repoUrl property is set', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        var agency = { id: 'VA', name: 'Department of Veterans Affairs' };
        spyOn(agencyService, 'getAgency').and.returnValue(agency);
        var repoURL = 'http://www.github.com/foobar/';
        var repo = createRepository({ name: 'A Fake repo name to show repo',
            repoURL: repoURL, homepage: 'http://code.gov/foobar/' });
        spyOn(reposService, 'getJsonFile').and.returnValue(Rx_1.Observable.of(repo));
        fixture.detectChanges();
        var anchors = fixture.nativeElement.querySelectorAll('.usa-button');
        // console.log('Anchors: ', anchors);
        // 2nd child anchor is the repoURL (first one is homepage)
        expect(anchors[1].href).toBe(repoURL);
    }));
    it('should display repository name in template if repo.name property is defined', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { name: 'VA REPO' });
        fixture.detectChanges();
        var el = fixture.nativeElement.querySelector('h1');
        // expect name to be disolayed
        expect(el.textContent).toBeDefined();
    }));
    /******* Test repo.description  ****/
    it('should NOT display repository description in template if repo.description '
        + 'property is undefined', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { description: undefined });
        fixture.detectChanges();
        var div = fixture.nativeElement.querySelector('.repo-header-container');
        expect(div.children[2]).toBeUndefined();
    }));
    it('should NOT display repository description in template if repo.description property is null', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { description: null });
        fixture.detectChanges();
        var div = fixture.nativeElement.querySelector('.repo-header-container');
        expect(div.children[2]).toBeUndefined();
    }));
    it('should display repository description in template if repo.description property is defined', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { description: 'REPO DESC' });
        fixture.detectChanges();
        var div = fixture.nativeElement.querySelector('.repo-header-container');
        expect(div.children[2]).toBeDefined();
    }));
    /******* Test repo.homepage  ****/
    it('should NOT display repository homepage in template if repo.homepage property is undefined', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { homepage: undefined });
        fixture.detectChanges();
        var parent = fixture.nativeElement.querySelector('.usa-unstyled-list');
        expect(parent.children[0]).toBeUndefined();
    }));
    it('should NOT display repository homepage in template if repo.homepage property is null', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { homepage: null });
        fixture.detectChanges();
        var parent = fixture.nativeElement.querySelector('.usa-unstyled-list');
        expect(parent.children[0]).toBeUndefined();
    }));
    it('should display repository homepage in template if repo.homepage property is defined', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { homepage: 'http://code.gov/' });
        fixture.detectChanges();
        var parent = fixture.nativeElement.querySelector('.usa-unstyled-list');
        expect(parent.children[0].children[0]).toBeDefined();
    }));
    /******* Test repo.repoUrl  ****/
    it('should NOT display repository url in template if repo.repoURL property is undefined', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { repoURL: undefined, homepage: 'http://foo.bar' });
        fixture.detectChanges();
        var parent = fixture.nativeElement.querySelector('.usa-unstyled-list');
        expect(parent.children[1]).toBeUndefined();
    }));
    it('should NOT display repository Url in template if repo.repoURL property is null', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { repoURL: null, homepage: 'http://foo.bar' });
        fixture.detectChanges();
        var parent = fixture.nativeElement.querySelector('.usa-unstyled-list');
        // console.log('PARENT: ', parent);
        expect(parent.children[1]).toBeUndefined();
    }));
    it('should display repository repoUrl in template if repo.repoURL property is defined', testing_1.inject([agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService], function (agencyService, reposService, seoService) {
        setupRepoPropertyTest(agencyService, reposService, seoService, { repoURL: 'http://code.gov/repo', homepage: undefined });
        fixture.detectChanges();
        var parent = fixture.nativeElement.querySelector('.usa-unstyled-list');
        // console.log('PARENT: ', parent);
        expect(parent.children[0]).toBeDefined();
    }));
    describe('ngOnDestroy()', function () {
        it('should unsubscribe from router event subscription on destroy', function () {
            fixture.detectChanges();
            spyOn(repoComponent.eventSub, 'unsubscribe');
            fixture.destroy();
            expect(repoComponent.eventSub.unsubscribe).toHaveBeenCalled();
        });
    });
});
/**
 *  Creates and populate a repository object for use in tests
 * using the RepoProps interface for type safety.
 */
function createRepository(repoProps) {
    return {
        repos: [
            { repoID: id, name: repoProps.name, description: repoProps.description,
                codeLanguage: [{ language: 'JavaScript' }], agency: 'VA',
                homepage: repoProps.homepage, repoURL: repoProps.repoURL }
        ]
    };
}
exports.createRepository = createRepository;
/**
 * Sets up a test of repository properties, by creating agency
 * and repostory data structures in addition to mocking
 * RepoComponent dependencies.
 */
function setupRepoPropertyTest(agencyService, reposService, seoService, repoProps) {
    var agency = { id: 'VA', name: 'Department of Veterans Affairs' };
    spyOn(agencyService, 'getAgency').and.returnValue(agency);
    // set up repository
    var FAKE_REPO = createRepository(repoProps);
    spyOn(reposService, 'getJsonFile').and.returnValue(Rx_1.Observable.of(FAKE_REPO));
}
exports.setupRepoPropertyTest = setupRepoPropertyTest;
/**
 * Mock route
 */
var MockActivatedRoute = (function (_super) {
    __extends(MockActivatedRoute, _super);
    function MockActivatedRoute() {
        _super.call(this);
        this.params = Rx_1.Observable.of({ id: id });
    }
    return MockActivatedRoute;
}(router_1.ActivatedRoute));
var DummyRoutingComponent = (function () {
    function DummyRoutingComponent() {
    }
    DummyRoutingComponent = __decorate([
        core_1.Component({
            template: ''
        }), 
        __metadata('design:paramtypes', [])
    ], DummyRoutingComponent);
    return DummyRoutingComponent;
}());
//# sourceMappingURL=repo.component.spec.js.map