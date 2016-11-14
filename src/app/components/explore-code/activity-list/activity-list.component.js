"use strict";
var core_1 = require('@angular/core');
var ActivityListComponent = (function () {
    function ActivityListComponent() {
    }
    ActivityListComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        setTimeout(function (_) { return _this.activities = _this.eventRepo.events; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ActivityListComponent.prototype, "eventRepo", void 0);
    ActivityListComponent = __decorate([
        core_1.Component({
            selector: 'activity-list',
            styles: [require('./activity-list.style.scss')],
            template: require('./activity-list.template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], ActivityListComponent);
    return ActivityListComponent;
}());
exports.ActivityListComponent = ActivityListComponent;
//# sourceMappingURL=activity-list.component.js.map