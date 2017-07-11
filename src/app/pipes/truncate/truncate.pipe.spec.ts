import { Component, PipeTransform } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TruncatePipe } from './truncate.pipe';

@Component({
    selector: 'test',
    template: `<h2>{{ message | truncate }}</h2>`
})
class TestTruncateComponent {
    message = 'This is a message';
}

@Component({
    selector: 'test2',
    template: `<h2>{{ message | truncate: 5 }}</h2>`
})
class TestTruncateWithLimitComponent {
    message = 'This is another message';
}

@Component({
    selector: 'test',
    template: `<h2>{{ message | truncate }}</h2>`
})
class TestUndefinedComponent {
    message = undefined;
}

@Component({
    selector: 'test',
    template: `<h2>{{ message | truncate }}</h2>`
})
class TestNullComponent {
    message = null;
}

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
describe('TruncatePipe', () => {
    let pipe: TruncatePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TruncatePipe,
                TestTruncateComponent,
                TestTruncateWithLimitComponent,
                TestUndefinedComponent,
                TestNullComponent
            ]
        });
        pipe = new TruncatePipe();
    });

    it('should truncate value more than 10 chars long', () => {
        let value = 'This is a long string';
        let expected = value.substring(0, 10) + '...';

        let actual = pipe.transform(value);

        expect(actual).toEqual(expected);
    });

    it('should NOT truncate value 10 chars long', () => {
        let value = '1234567890';
        let expected = value;

        let actual = pipe.transform(value);

        expect(actual).toEqual(expected);
    });

    it('should not truncate value < 10 chars long', () => {
        let value = 'Hello';
        let expected = value;

        let actual = pipe.transform(value);

        expect(actual).toEqual(expected);
    });

    it('should not truncate empty string', () => {
        let value = '';
        let expected = value;

        let actual = pipe.transform(value);

        expect(actual).toEqual(expected);
    });

    it('should truncate string at limit argument (5) length', () => {
        let value = '123456';
        // limit argument set to 5
        let size = '5';
        let expected = value.substring(0, parseInt(size, 10)) + '...';

        let actual = pipe.transform(value, size);

        expect(actual).toEqual(expected);
    });

    it('should truncate to default (10) if limit argument is not a number', () => {
        let limit = 'foobar'; // limit isNaN()
        let value = 'This should be truncated';
        let expected = value.substring(0, 10) + '...';

        let actual = pipe.transform(value, limit);

        expect(actual).toEqual(expected);
    });

    it('should truncate to default (10) if limit argument does not have a radix of 10', () => {
        let limit = '0xF'; // hexidecimal (radix 16)
        let value = 'This should be truncated';
        let expected = value.substring(0, 10) + '...';

        let actual = pipe.transform(value, limit);

        expect(actual).toEqual(expected);
    });


    it('should work in an integration test inside a component template', () => {
        // TestTruncateComponent defined below whose template uses the truncate pipe
        let fixture = TestBed.createComponent(TestTruncateComponent);
        let component = fixture.componentInstance;
        let message = component.message;
        let expected = message.substring(0, 10) + '...';
        fixture.detectChanges();

        let actual = fixture.nativeElement.querySelector('h2').innerText;

        expect(actual).toEqual(expected);
    });


    it('should work in an integration test inside a component template with a  ' +
        'pipe limit argument', () => {
        // TestTruncateWithLimitComponent defined below whose template uses
        //   the truncate pipe with an argument.
        let fixture = TestBed.createComponent(TestTruncateWithLimitComponent);
        let component = fixture.componentInstance;
        let message = component.message;
        // truncate pipe argument sets limit to 5.
        let expected = message.substring(0, 5) + '...';
        fixture.detectChanges();

        let actual = fixture.nativeElement.querySelector('h2').innerText;

        expect(actual).toEqual(expected);
    });

    it('should return null if value argument to transform() is undefined', () => {
        let value = undefined;

        let actual = pipe.transform(value);

        expect(actual).toBeNull();
    });

    it('should return null if value argument to transform() is null', () => {
        let value = null;

        let actual = pipe.transform(value);

        expect(actual).toBeNull();
    });

    it('should return an empty string inside a real component template when ' +
        'value to truncate is undefined', () => {
        // TestUndefinedComponent defined below whose template uses the truncate pipe
        let fixture = TestBed.createComponent(TestUndefinedComponent);
        let component = fixture.componentInstance;
        let message = component.message;
        // In a template, a null value gets converted to an empty string.
        let expected = '';
        fixture.detectChanges();

        let actual = fixture.nativeElement.querySelector('h2').innerText;

        expect(actual).toEqual(expected);
    });

    it('should return an empty string inside a real component template when ' +
        'value to truncate is null', () => {
        // TestNullComponent defined below whose template uses the truncate pipe
        let fixture = TestBed.createComponent(TestNullComponent);
        let component = fixture.componentInstance;
        let message = component.message;
        fixture.detectChanges();
        // In a template, a null value gets converted to an empty string.
        let expected = '';

        let actual = fixture.nativeElement.querySelector('h2').innerText;

        expect(actual).toEqual(expected);
    });



});
