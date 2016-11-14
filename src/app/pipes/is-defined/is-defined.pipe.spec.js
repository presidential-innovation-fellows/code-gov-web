"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var testing_1 = require('@angular/core/testing');
var is_defined_pipe_1 = require('./is-defined.pipe');
/**
 * Unit tests for IsDefinedPipe including tests for
 * IsDefinedPipe.transform() and tests where the pipe
 * is integrated into a template.
 */
describe('IsDefinedPipe', function () {
    describe('IsDefinedPipe.transform() called', function () {
        var pipe;
        beforeEach(function () {
            pipe = new is_defined_pipe_1.IsDefinedPipe();
        });
        it('should return true for a defined string input value', function () {
            var value = 'Foobar';
            var actual = pipe.transform(value);
            expect(actual).toBeTruthy();
        });
        it('should return true for a defined object input value', function () {
            var value = { id: 1, name: 'Foobar' };
            var actual = pipe.transform(value);
            expect(actual).toBeTruthy();
        });
        it('should return false for a null input value', function () {
            var value = null;
            var actual = pipe.transform(value);
            expect(actual).toBeFalsy();
        });
        it('should return false for a "null" string input value', function () {
            var value = 'null';
            var actual = pipe.transform(value);
            expect(actual).toBeFalsy();
        });
        it('should return false for a "null" string input value containg spaces', function () {
            var value = ' null  ';
            var actual = pipe.transform(value);
            expect(actual).toBeFalsy();
        });
        it('should return false for a undefined input value', function () {
            var value = undefined;
            var actual = pipe.transform(value);
            expect(actual).toBeFalsy();
        });
        it('should return false for an empty string input value', function () {
            var value = '';
            var actual = pipe.transform(value);
            expect(actual).toBeFalsy();
        });
        it('should return false for an empty string containing spaces input value', function () {
            var value = ' ';
            var actual = pipe.transform(value);
            expect(actual).toBeFalsy();
        });
        it('should return true for a positive number type input value', function () {
            var value = 12345;
            var actual = pipe.transform(value);
            expect(actual).toBeTruthy();
        });
        it('should return true for a negative number type input value', function () {
            var value = -12345;
            var actual = pipe.transform(value);
            expect(actual).toBeTruthy();
        });
        it('should return true for zero number type input value', function () {
            var value = 0;
            var actual = pipe.transform(value);
            expect(actual).toBeTruthy();
        });
        it('should return true for a Number.MAX_VALUE input value', function () {
            var value = Number.MAX_VALUE;
            var actual = pipe.transform(value);
            expect(actual).toBeTruthy();
        });
        it('should return true for a Number.MIN_VALUE input value', function () {
            var value = Number.MIN_VALUE;
            var actual = pipe.transform(value);
            expect(actual).toBeTruthy();
        });
        it('should return false for a Number.NaN input value', function () {
            var value = Number.NaN;
            var actual = pipe.transform(value);
            expect(actual).toBeFalsy();
        });
        it('should return true for if input value is a boolean true', function () {
            var value = true;
            var actual = pipe.transform(value);
            expect(actual).toBeTruthy();
        });
        it('should return false for if input value is a boolean false', function () {
            var value = false;
            var actual = pipe.transform(value);
            expect(actual).toBeFalsy();
        });
    });
    describe('IsDefinedPipe integrated in a template', function () {
        var fixture;
        var testComponent;
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [common_1.CommonModule],
                declarations: [
                    is_defined_pipe_1.IsDefinedPipe,
                    TestIsDefinedPipeComponent,
                    TestIsDefinedPipeWithObjectComponent,
                    TestIsNotDefinedPipeComponent,
                    TestIsDefinedWithExpressionPipeComponent
                ],
                providers: []
            });
            fixture = testing_1.TestBed.createComponent(TestIsDefinedPipeComponent);
            testComponent = fixture.componentInstance;
        });
        it('should display text when value is defined string', function () {
            var expected = 'Foobar';
            testComponent.setValue(expected);
            fixture.detectChanges();
            var actual = fixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);
            expect(actual).toEqual(expected);
        });
        it('should display text when value is defined object', function () {
            // use TestIsDefinedPipeWithObjectComponent in this test
            var objFixture = testing_1.TestBed.createComponent(TestIsDefinedPipeWithObjectComponent);
            var testObjComponent = objFixture.componentInstance;
            var expected = { id: 3, name: 'Foobar' };
            testObjComponent.setValue(expected);
            objFixture.detectChanges();
            var actual = objFixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);
            expect(actual).toEqual(expected.name);
        });
        it('should not display text when value is undefined', function () {
            var expected = undefined;
            testComponent.setValue(expected);
            fixture.detectChanges();
            var el = fixture.nativeElement.querySelector('h1');
            // console.log('actual value', el);
            expect(el).toBeNull();
        });
        it('should not display text when value is null', function () {
            var expected = null;
            testComponent.setValue(expected);
            fixture.detectChanges();
            var el = fixture.nativeElement.querySelector('h1');
            // console.log('actual value', el);
            expect(el).toBeNull();
        });
        it('should not display text when value is string with "null" value', function () {
            var expected = 'null';
            testComponent.setValue(expected);
            fixture.detectChanges();
            var el = fixture.nativeElement.querySelector('h1');
            // console.log('actual value', el);
            expect(el).toBeNull();
        });
        it('should display text when value is zero', function () {
            var expected = 0;
            testComponent.setValue(expected);
            fixture.detectChanges();
            var actual = fixture.nativeElement.querySelector('h1').textContent;
            // console.log('actual value', actual);
            // actual is '0' string, so we use == comparison
            // tslint:disable-next-line: triple-equals
            expect(actual == expected).toBeTruthy();
        });
        it('should display text when !value is undefined', function () {
            // note that !undefined === true
            var objFixture = testing_1.TestBed.createComponent(TestIsNotDefinedPipeComponent);
            var testObjComponent = objFixture.componentInstance;
            var val = undefined;
            testObjComponent.setValue(val);
            objFixture.detectChanges();
            var actual = objFixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);
            expect(actual).toEqual('Undefined');
        });
        it('should display text when all values in "&&" expression is defined', function () {
            var objFixture = testing_1.TestBed.createComponent(TestIsDefinedWithExpressionPipeComponent);
            var testObjComponent = objFixture.componentInstance;
            var val1 = 99;
            testObjComponent.setValue1(val1);
            var val2 = 'val2 defined';
            testObjComponent.setValue2(val2);
            objFixture.detectChanges();
            var actual = objFixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);
            expect(actual).toEqual('Two Values Defined');
        });
        it('should NOT display text when one value in "&&" expression is undefined', function () {
            var objFixture = testing_1.TestBed.createComponent(TestIsDefinedWithExpressionPipeComponent);
            var testObjComponent = objFixture.componentInstance;
            var val1 = 99;
            testObjComponent.setValue1(val1);
            var val2 = undefined;
            testObjComponent.setValue2(val2);
            objFixture.detectChanges();
            var el = objFixture.nativeElement.querySelector('h1');
            // console.log('actual value', el);
            expect(el).toBeNull();
        });
        it('should display text when value is expression evaluating to true', function () {
            var expected = true || false;
            testComponent.setValue(expected);
            fixture.detectChanges();
            var actual = fixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);
            expect(actual).toEqual('true');
        });
    });
});
var TestIsDefinedPipeComponent = (function () {
    function TestIsDefinedPipeComponent() {
    }
    TestIsDefinedPipeComponent.prototype.setValue = function (val) {
        this.value = val;
    };
    TestIsDefinedPipeComponent = __decorate([
        core_1.Component({
            selector: '',
            template: "<h1 *ngIf=\"value | isdefined\">{{value}}</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestIsDefinedPipeComponent);
    return TestIsDefinedPipeComponent;
}());
var TestIsDefinedPipeWithObjectComponent = (function () {
    function TestIsDefinedPipeWithObjectComponent() {
    }
    TestIsDefinedPipeWithObjectComponent.prototype.setValue = function (val) {
        this.value = val;
    };
    TestIsDefinedPipeWithObjectComponent = __decorate([
        core_1.Component({
            selector: '',
            template: "<h1 *ngIf=\"value | isdefined\">{{value.name}}</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestIsDefinedPipeWithObjectComponent);
    return TestIsDefinedPipeWithObjectComponent;
}());
var TestIsNotDefinedPipeComponent = (function () {
    function TestIsNotDefinedPipeComponent() {
    }
    TestIsNotDefinedPipeComponent.prototype.setValue = function (val) {
        this.value = val;
    };
    TestIsNotDefinedPipeComponent = __decorate([
        core_1.Component({
            selector: '',
            template: "<h1 *ngIf=\"!value | isdefined\">Undefined</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestIsNotDefinedPipeComponent);
    return TestIsNotDefinedPipeComponent;
}());
var TestIsDefinedWithExpressionPipeComponent = (function () {
    function TestIsDefinedWithExpressionPipeComponent() {
    }
    TestIsDefinedWithExpressionPipeComponent.prototype.setValue1 = function (val) {
        this.value1 = val;
    };
    TestIsDefinedWithExpressionPipeComponent.prototype.setValue2 = function (val) {
        this.value2 = val;
    };
    TestIsDefinedWithExpressionPipeComponent = __decorate([
        core_1.Component({
            selector: '',
            template: "<h1 *ngIf=\"value1 && value2 | isdefined\">Two Values Defined</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestIsDefinedWithExpressionPipeComponent);
    return TestIsDefinedWithExpressionPipeComponent;
}());
//# sourceMappingURL=is-defined.pipe.spec.js.map