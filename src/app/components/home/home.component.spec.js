"use strict";
var _this = this;
var testing_1 = require('@angular/core/testing');
var banner_art_1 = require('./banner-art');
var external_link_1 = require('../../directives/external-link');
var _1 = require('./');
var modal_1 = require('../modal');
var modal_2 = require('../../services/modal');
var seo_1 = require('../../services/seo');
var state_1 = require('../../services/state');
describe('HomeComponent', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                banner_art_1.BannerArtComponent,
                external_link_1.ExternalLinkDirective,
                _1.HomeComponent,
                modal_1.ModalComponent
            ],
            providers: [
                modal_2.ModalService,
                seo_1.SeoService,
                state_1.StateService
            ]
        });
        _this.fixture = testing_1.TestBed.createComponent(_1.HomeComponent);
        _this.homeComponent = _this.fixture.componentInstance;
    });
    it('should have a heading', function () {
        expect(_this.homeComponent.url).toEqual('https://pif.gov');
    });
});
//# sourceMappingURL=home.component.spec.js.map