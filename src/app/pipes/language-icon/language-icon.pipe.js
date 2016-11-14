"use strict";
var core_1 = require('@angular/core');
var _1 = require('./');
var LanguageIconPipe = (function () {
    function LanguageIconPipe() {
    }
    LanguageIconPipe.prototype.transform = function (value) {
        switch (value) {
            case 'html':
                value = 'html5';
                break;
            case 'css':
                value = 'css3';
                break;
            default:
                break;
        }
        if (_1.LANGUAGES.indexOf(value) > -1) {
            return value;
        }
        else {
            return 'code_badge';
        }
    };
    LanguageIconPipe = __decorate([
        core_1.Pipe({
            name: 'languageIcon'
        }), 
        __metadata('design:paramtypes', [])
    ], LanguageIconPipe);
    return LanguageIconPipe;
}());
exports.LanguageIconPipe = LanguageIconPipe;
//# sourceMappingURL=language-icon.pipe.js.map