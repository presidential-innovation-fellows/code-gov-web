"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var truncate_pipe_1 = require('./truncate.pipe');
/**
 * Unit tests for TruncatePipe class.
 *
 * Most of the tests are pure unit tests of the transform() method's
 * logic using the raw PipeTransform class.
 *
 * However, the last two tests integrate the TransformPipe into test components.
 * These tests are denoted as 'integration' tests.
 *
 */
describe('TruncatePipe', function () {
    var pipe;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                truncate_pipe_1.TruncatePipe,
                TestTruncateComponent,
                TestTruncateWithLimitComponent,
                TestUndefinedComponent,
                TestNullComponent
            ]
        });
        pipe = new truncate_pipe_1.TruncatePipe();
    });
    it('should truncate value more than 10 chars long', function () {
        var value = 'This is a long string';
        var expected = value.substring(0, 10) + '...';
        var actual = pipe.transform(value);
        expect(actual).toEqual(expected);
    });
    it('should NOT truncate value 10 chars long', function () {
        var value = '1234567890';
        var expected = value;
        var actual = pipe.transform(value);
        expect(actual).toEqual(expected);
    });
    it('should not truncate value < 10 chars long', function () {
        var value = 'Hello';
        var expected = value;
        var actual = pipe.transform(value);
        expect(actual).toEqual(expected);
    });
    it('should not truncate empty string', function () {
        var value = '';
        var expected = value;
        var actual = pipe.transform(value);
        expect(actual).toEqual(expected);
    });
    it('should truncate string at limit argument (5) length', function () {
        var value = '123456';
        // limit argument set to 5
        var size = '5';
        var expected = value.substring(0, parseInt(size, 10)) + '...';
        var actual = pipe.transform(value, size);
        expect(actual).toEqual(expected);
    });
    it('should truncate to default (10) if limit argument is not a number', function () {
        var limit = 'foobar'; // limit isNaN()
        var value = 'This should be truncated';
        var expected = value.substring(0, 10) + '...';
        var actual = pipe.transform(value, limit);
        expect(actual).toEqual(expected);
    });
    it('should truncate to default (10) if limit argument does not have a radix of 10', function () {
        var limit = '0xF'; // hexidecimal (radix 16)
        var value = 'This should be truncated';
        var expected = value.substring(0, 10) + '...';
        var actual = pipe.transform(value, limit);
        expect(actual).toEqual(expected);
    });
    it('should work in an integration test inside a component template', function () {
        // TestTruncateComponent defined below whose template uses the truncate pipe
        var fixture = testing_1.TestBed.createComponent(TestTruncateComponent);
        var component = fixture.componentInstance;
        var message = component.message;
        var expected = message.substring(0, 10) + '...';
        fixture.detectChanges();
        var actual = fixture.nativeElement.querySelector('h2').innerText;
        expect(actual).toEqual(expected);
    });
    it('should work in an integration test inside a component template with a  ' +
        'pipe limit argument', function () {
        // TestTruncateWithLimitComponent defined below whose template uses
        //   the truncate pipe with an argument.
        var fixture = testing_1.TestBed.createComponent(TestTruncateWithLimitComponent);
        var component = fixture.componentInstance;
        var message = component.message;
        // truncate pipe argument sets limit to 5.
        var expected = message.substring(0, 5) + '...';
        fixture.detectChanges();
        var actual = fixture.nativeElement.querySelector('h2').innerText;
        expect(actual).toEqual(expected);
    });
    it('should return null if value argument to transform() is undefined', function () {
        var value = undefined;
        var actual = pipe.transform(value);
        expect(actual).toBeNull();
    });
    it('should return null if value argument to transform() is null', function () {
        var value = null;
        var actual = pipe.transform(value);
        expect(actual).toBeNull();
    });
    it('should return an empty string inside a real component template when ' +
        'value to truncate is undefined', function () {
        // TestUndefinedComponent defined below whose template uses the truncate pipe
        var fixture = testing_1.TestBed.createComponent(TestUndefinedComponent);
        var component = fixture.componentInstance;
        var message = component.message;
        // In a template, a null value gets converted to an empty string.
        var expected = '';
        fixture.detectChanges();
        var actual = fixture.nativeElement.querySelector('h2').innerText;
        expect(actual).toEqual(expected);
    });
    it('should return an empty string inside a real component template when ' +
        'value to truncate is null', function () {
        // TestNullComponent defined below whose template uses the truncate pipe
        var fixture = testing_1.TestBed.createComponent(TestNullComponent);
        var component = fixture.componentInstance;
        var message = component.message;
        fixture.detectChanges();
        // In a template, a null value gets converted to an empty string.
        var expected = '';
        var actual = fixture.nativeElement.querySelector('h2').innerText;
        expect(actual).toEqual(expected);
    });
});
var TestTruncateComponent = (function () {
    function TestTruncateComponent() {
        this.message = 'This is a message';
    }
    TestTruncateComponent = __decorate([
        core_1.Component({
            selector: 'test',
            template: "<h2>{{ message | truncate }}</h2>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestTruncateComponent);
    return TestTruncateComponent;
}());
var TestTruncateWithLimitComponent = (function () {
    function TestTruncateWithLimitComponent() {
        this.message = 'This is another message';
    }
    TestTruncateWithLimitComponent = __decorate([
        core_1.Component({
            selector: 'test2',
            template: "<h2>{{ message | truncate: 5 }}</h2>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestTruncateWithLimitComponent);
    return TestTruncateWithLimitComponent;
}());
var TestUndefinedComponent = (function () {
    function TestUndefinedComponent() {
        this.message = undefined;
    }
    TestUndefinedComponent = __decorate([
        core_1.Component({
            selector: 'test',
            template: "<h2>{{ message | truncate }}</h2>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestUndefinedComponent);
    return TestUndefinedComponent;
}());
var TestNullComponent = (function () {
    function TestNullComponent() {
        this.message = null;
    }
    TestNullComponent = __decorate([
        core_1.Component({
            selector: 'test',
            template: "<h2>{{ message | truncate }}</h2>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestNullComponent);
    return TestNullComponent;
}());
//# sourceMappingURL=truncate.pipe.spec.js.map