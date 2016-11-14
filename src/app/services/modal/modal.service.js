"use strict";
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var ModalService = (function () {
    function ModalService() {
        this.modalActivation = new Subject_1.Subject();
        // tslint:disable-next-line:member-ordering
        this.modalActivated$ = this.modalActivation.asObservable();
    }
    ModalService.prototype.showModal = function (modalData) {
        this.modalActivation.next(modalData);
    };
    ModalService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ModalService);
    return ModalService;
}());
exports.ModalService = ModalService;
//# sourceMappingURL=modal.service.js.map