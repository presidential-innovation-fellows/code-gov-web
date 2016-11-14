"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var angulartics2_1 = require('angulartics2');
var providers_1 = require('angulartics2/dist/providers');
var state_1 = require('../../services/state');
var AppComponent = (function () {
    function AppComponent(angulartics2, angulartics2GoogleAnalytics, router, stateService) {
        this.angulartics2 = angulartics2;
        this.angulartics2GoogleAnalytics = angulartics2GoogleAnalytics;
        this.router = router;
        this.stateService = stateService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventSub = this.router.events.subscribe(function (evt) {
            if (!(evt instanceof router_1.NavigationEnd)) {
                return;
            }
            _this.angulartics2.pageTrack("/url");
            _this.angulartics2GoogleAnalytics.pageTrack(evt.url);
            document.body.scrollTop = 0;
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        if (this.eventSub)
            this.eventSub.unsubscribe();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [require('./app.style.scss')],
            template: require('./app.template.html')
        }), 
        __metadata('design:paramtypes', [angulartics2_1.Angulartics2, providers_1.Angulartics2GoogleAnalytics, router_1.Router, state_1.StateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map