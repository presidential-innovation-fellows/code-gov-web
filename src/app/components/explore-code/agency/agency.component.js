"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var agency_1 = require('../../../services/agency');
var repos_1 = require('../../../services/repos');
var seo_1 = require('../../../services/seo');
var AgencyComponent = (function () {
    function AgencyComponent(agencyService, route, reposService, seoService) {
        this.agencyService = agencyService;
        this.route = route;
        this.reposService = reposService;
        this.seoService = seoService;
        this.hasRepos = false;
    }
    AgencyComponent.prototype.ngOnDestroy = function () {
        this.hasRepos = false;
        this.agency = null;
        if (this.eventSub)
            this.eventSub.unsubscribe();
        if (this.agencyReposSub)
            this.agencyReposSub.unsubscribe();
    };
    AgencyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventSub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.agency = _this.agencyService.getAgency(id);
            _this.agencyRepos();
            _this.seoService.setTitle(_this.agency.name, true);
            _this.seoService.setMetaDescription('Browse code from the ' + _this.agency.name);
            _this.seoService.setMetaRobots('Index, Follow');
        });
    };
    AgencyComponent.prototype.agencyId = function () {
        return this.agency.id;
    };
    AgencyComponent.prototype.agencyRepos = function () {
        var _this = this;
        this.agencyReposSub = this.reposService.getJsonFile().
            subscribe(function (result) {
            if (result) {
                _this.repos = result['repos'].filter(function (repo) { return _this.filterByAgency(repo); });
                _this.hasRepos = _this.checkRepos(_this.repos);
            }
            else {
                console.log('Error.');
            }
        });
    };
    AgencyComponent.prototype.checkRepos = function (repos) {
        if (repos.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AgencyComponent.prototype.filterByAgency = function (repo) {
        if (repo.agency !== undefined && repo.agency === this.agencyId()) {
            return true;
        }
        else {
            return false;
        }
    };
    AgencyComponent = __decorate([
        core_1.Component({
            selector: 'agency',
            styles: [require('./agency.styles.scss')],
            template: require('./agency.template.html')
        }), 
        __metadata('design:paramtypes', [agency_1.AgencyService, router_1.ActivatedRoute, repos_1.ReposService, seo_1.SeoService])
    ], AgencyComponent);
    return AgencyComponent;
}());
exports.AgencyComponent = AgencyComponent;
//# sourceMappingURL=agency.component.js.map