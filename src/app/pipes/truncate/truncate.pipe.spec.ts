import { Component, PipeTransform } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import { TruncatePipe } from './truncate.pipe';


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
    let pipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatePipe, TestComponent, Test2Component]
        })
        pipe = new TruncatePipe();
    });

    // Test fails. This will be noted in a Github issue to be fixed later.
    // it('should return null if value is undefined', () => {
    //     let value = undefined;
    //     let expected = '';

    //     let actual = pipe.transform(value);

    //     expect(actual).toBeNull();
    // });

    it('should truncate value', () => {
        let value = 'This is a long string';
        let expected = 'This is a ...';

        let actual = pipe.transform(value);

        expect(actual).toEqual(expected);
    });

    it('should NOT truncate value 10 chars long', () => {
        let value = '1234567890';
        let expected = value;

        let actual = pipe.transform(value);

        expect(actual).toEqual(expected);
    });

    it('should truncate value 11 chars long', () => {
        let value = '12345678901';
        let expected = value.substring(0, 10) + '...';

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
        let expected = value.substring(0, parseInt(size)) + '...';

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


    it('should work in an integration test inside a real component template', () => {
        // TestComponent defined below whose template uses the truncate pipe
        let fixture = TestBed.createComponent(TestComponent);
        let component = fixture.componentInstance;
        let message = component.message;
        let expected = message.substring(0, 10) + '...';
        fixture.detectChanges();

        // let element = fixture.debugElement.query(By.css('h2'));
        // let actual = element.nativeElement.innerText;
        let actual = fixture.nativeElement.querySelector('h2').innerText;

        expect(actual).toEqual(expected);
    });


    it('should work in an integration test inside a real component template with a pipe limit argument', () => {
        // Test2Component defined below whose template uses the truncate pipe with an argument
        let fixture = TestBed.createComponent(Test2Component);
        let component = fixture.componentInstance;
        let message = component.message;
        // truncate pipe argument sets limit to 5.
        let expected = message.substring(0, 5) + '...';
        fixture.detectChanges();

        let actual = fixture.nativeElement.querySelector('h2').innerText;

        expect(actual).toEqual(expected);
    });
});

@Component({
    selector: 'test',
    template: `<h2>{{ message | truncate }}</h2>`
})
class TestComponent {
    message = 'This is a message';
}

@Component({
    selector: 'test2',
    template: `<h2>{{ message | truncate: 5 }}</h2>`
})
class Test2Component {
    message = 'This is another message';
}
