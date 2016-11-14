"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var agency_1 = require('../../../services/agency');
var repos_1 = require('../../../services/repos');
var seo_1 = require('../../../services/seo');
var RepoComponent = (function () {
    function RepoComponent(route, agencyService, reposService, seoService) {
        this.route = route;
        this.agencyService = agencyService;
        this.reposService = reposService;
        this.seoService = seoService;
    }
    RepoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventSub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.getRepo(id);
        });
    };
    RepoComponent.prototype.ngOnDestroy = function () {
        if (this.eventSub)
            this.eventSub.unsubscribe();
        if (this.repoSub)
            this.repoSub.unsubscribe();
    };
    RepoComponent.prototype.getRepo = function (id) {
        var _this = this;
        this.repoSub = this.reposService.getJsonFile().
            subscribe(function (result) {
            if (result) {
                _this.repo = result['repos'].filter(function (repo) { return repo.repoID === id; })[0];
                _this.repo.agency = _this.agencyService.getAgency(_this.repo.agency);
                _this.seoService.setTitle(_this.repo.name, true);
                _this.seoService.setMetaDescription(_this.repo.description);
                _this.seoService.setMetaRobots('Index, Follow');
            }
            else {
                console.log('Error. Source code repositories not found');
            }
        });
    };
    RepoComponent = __decorate([
        core_1.Component({
            selector: 'repo',
            styles: [require('./repo.styles.scss')],
            template: require('./repo.template.html')
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, agency_1.AgencyService, repos_1.ReposService, seo_1.SeoService])
    ], RepoComponent);
    return RepoComponent;
}());
exports.RepoComponent = RepoComponent;
//# sourceMappingURL=repo.component.js.map