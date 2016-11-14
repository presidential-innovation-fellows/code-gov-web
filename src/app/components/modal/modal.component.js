"use strict";
var core_1 = require('@angular/core');
var modal_1 = require('../../services/modal');
var ModalComponent = (function () {
    function ModalComponent(modalService) {
        var _this = this;
        this.modalService = modalService;
        this.modalSub = modalService.modalActivated$.subscribe(function (modal) {
            _this.description = modal['description'];
            _this.title = modal['title'];
            _this.url = modal['url'];
            _this.visible = true;
        });
    }
    ModalComponent.prototype.ngOnDestroy = function () {
        if (this.modalSub)
            this.modalSub.unsubscribe();
    };
    ModalComponent.prototype.close = function () {
        this.visible = false;
    };
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'modal',
            styles: [require('./modal.style.scss')],
            template: require('./modal.template.html')
        }), 
        __metadata('design:paramtypes', [modal_1.ModalService])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map