import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IsDefinedPipe } from './is-defined.pipe';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
    selector: '',
    template: `<h1 *ngIf="value | isdefined">{{value}}</h1>`
})
class TestIsDefinedPipeComponent {
    private value: any;

    setValue(val: any) {
        this.value = val;
    }
}

interface TestObject {
    id: number;
    name: string;
}

@Component({
    selector: '',
    template: `<h1 *ngIf="value | isdefined">{{value.name}}</h1>`
})
class TestIsDefinedPipeWithObjectComponent {
    private value: TestObject;

    setValue(val: TestObject) {
        this.value = val;
    }
}

@Component({
    selector: '',
    template: `<h1 *ngIf="!value | isdefined">Undefined</h1>`
})
class TestIsNotDefinedPipeComponent {
    private value: any;

    setValue(val: any) {
        this.value = val;
    }
}

@Component({
    selector: '',
    template: `<h1 *ngIf="value1 && value2 | isdefined">Two Values Defined</h1>`
})
class TestIsDefinedWithExpressionPipeComponent {
    private value1: any;
    private value2: any;

    setValue1(val: any) {
        this.value1 = val;
    }

    setValue2(val: any) {
        this.value2 = val;
    }
}

/**
 * Unit tests for IsDefinedPipe including tests for
 * IsDefinedPipe.transform() and tests where the pipe
 * is integrated into a template.
 */
describe('IsDefinedPipe', () => {
    describe('IsDefinedPipe.transform() called', () => {
        let pipe: IsDefinedPipe;
        beforeEach(() => {
            pipe = new IsDefinedPipe();
        });

        it('should return true for a defined string input value', () => {
            let value = 'Foobar';

            let actual = pipe.transform(value);

            expect(actual).toBeTruthy();
        });

        it('should return true for a defined object input value', () => {
            let value = {id: 1, name: 'Foobar'};

            let actual = pipe.transform(value);

            expect(actual).toBeTruthy();
        });

        it('should return false for a null input value', () => {
            let value = null;

            let actual = pipe.transform(value);

            expect(actual).toBeFalsy();
        });

        it('should return false for a "null" string input value', () => {
            let value = 'null';

            let actual = pipe.transform(value);

            expect(actual).toBeFalsy();
        });

        it('should return false for a "null" string input value containg spaces', () => {
            let value = ' null  ';

            let actual = pipe.transform(value);

            expect(actual).toBeFalsy();
        });


        it('should return false for a undefined input value', () => {
            let value = undefined;

            let actual = pipe.transform(value);

            expect(actual).toBeFalsy();
        });

        it('should return false for an empty string input value', () => {
            let value = '';

            let actual = pipe.transform(value);

            expect(actual).toBeFalsy();
        });

        it('should return false for an empty string containing spaces input value', () => {
            let value = ' ';

            let actual = pipe.transform(value);

            expect(actual).toBeFalsy();
        });

        it('should return true for a positive number type input value', () => {
            let value = 12345;

            let actual = pipe.transform(value);

            expect(actual).toBeTruthy();
        });

        it('should return true for a negative number type input value', () => {
            let value = -12345;

            let actual = pipe.transform(value);

            expect(actual).toBeTruthy();
        });

        it('should return true for zero number type input value', () => {
            let value = 0;

            let actual = pipe.transform(value);

            expect(actual).toBeTruthy();
        });

        it('should return true for a Number.MAX_VALUE input value', () => {
            let value = Number.MAX_VALUE;

            let actual = pipe.transform(value);

            expect(actual).toBeTruthy();
        });

        it('should return true for a Number.MIN_VALUE input value', () => {
            let value = Number.MIN_VALUE;

            let actual = pipe.transform(value);

            expect(actual).toBeTruthy();
        });

        it('should return false for a Number.NaN input value', () => {
            let value = Number.NaN;

            let actual = pipe.transform(value);

            expect(actual).toBeFalsy();
        });

        it('should return true for if input value is a boolean true', () => {
            let value = true;

            let actual = pipe.transform(value);

            expect(actual).toBeTruthy();
        });

        it('should return false for if input value is a boolean false', () => {
            let value = false;

            let actual = pipe.transform(value);

            expect(actual).toBeFalsy();
        });

    });

    describe('IsDefinedPipe integrated in a template', () => {
        let fixture: ComponentFixture<TestIsDefinedPipeComponent>;
        let testComponent: TestIsDefinedPipeComponent;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule],
                declarations: [
                    IsDefinedPipe,
                    TestIsDefinedPipeComponent,
                    TestIsDefinedPipeWithObjectComponent,
                    TestIsNotDefinedPipeComponent,
                    TestIsDefinedWithExpressionPipeComponent
                    ],
                providers: []
            });
            fixture = TestBed.createComponent(TestIsDefinedPipeComponent);
            testComponent = fixture.componentInstance;
        });

        it('should display text when value is defined string', () => {
            let expected = 'Foobar';
            testComponent.setValue(expected);

            fixture.detectChanges();

            let actual = fixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);

            expect(actual).toEqual(expected);
        });

        it('should display text when value is defined object', () => {
            // use TestIsDefinedPipeWithObjectComponent in this test
            let objFixture: ComponentFixture<TestIsDefinedPipeWithObjectComponent>
                = TestBed.createComponent(TestIsDefinedPipeWithObjectComponent);
            let testObjComponent: TestIsDefinedPipeWithObjectComponent
                = objFixture.componentInstance;
            let expected: TestObject = {id: 3, name: 'Foobar'};
            testObjComponent.setValue(expected);

            objFixture.detectChanges();

            let actual = objFixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);

            expect(actual).toEqual(expected.name);
        });


        it('should not display text when value is undefined', () => {
            let expected = undefined;
            testComponent.setValue(expected);

            fixture.detectChanges();

            let el = fixture.nativeElement.querySelector('h1');
            // console.log('actual value', el);

            expect(el).toBeNull();
        });

        it('should not display text when value is null', () => {
            let expected = null;
            testComponent.setValue(expected);

            fixture.detectChanges();

            let el = fixture.nativeElement.querySelector('h1');
            // console.log('actual value', el);

            expect(el).toBeNull();
        });

        it('should not display text when value is string with "null" value', () => {
            let expected = 'null';
            testComponent.setValue(expected);

            fixture.detectChanges();

            let el = fixture.nativeElement.querySelector('h1');
            // console.log('actual value', el);

            expect(el).toBeNull();
        });

        it('should display text when value is zero', () => {
            let expected = 0;
            testComponent.setValue(expected);

            fixture.detectChanges();

            let actual = fixture.nativeElement.querySelector('h1').textContent;
            // console.log('actual value', actual);

            // actual is '0' string, so we use == comparison
            // tslint:disable-next-line: triple-equals
            expect(actual == expected).toBeTruthy();
        });

        it('should display text when !value is undefined', () => {
            // note that !undefined === true
            let objFixture: ComponentFixture<TestIsNotDefinedPipeComponent>
                = TestBed.createComponent(TestIsNotDefinedPipeComponent);
            let testObjComponent: TestIsNotDefinedPipeComponent
                = objFixture.componentInstance;
            let val = undefined;
            testObjComponent.setValue(val);

            objFixture.detectChanges();

            let actual = objFixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);

            expect(actual).toEqual('Undefined');
        });

        it('should display text when all values in "&&" expression is defined', () => {
            let objFixture: ComponentFixture<TestIsDefinedWithExpressionPipeComponent>
                = TestBed.createComponent(TestIsDefinedWithExpressionPipeComponent);
            let testObjComponent: TestIsDefinedWithExpressionPipeComponent
                = objFixture.componentInstance;
            let val1 = 99;
            testObjComponent.setValue1(val1);
            let val2 = 'val2 defined';
            testObjComponent.setValue2(val2);

            objFixture.detectChanges();

            let actual = objFixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);

            expect(actual).toEqual('Two Values Defined');
        });

        it('should NOT display text when one value in "&&" expression is undefined', () => {
            let objFixture: ComponentFixture<TestIsDefinedWithExpressionPipeComponent>
                = TestBed.createComponent(TestIsDefinedWithExpressionPipeComponent);
            let testObjComponent: TestIsDefinedWithExpressionPipeComponent
                = objFixture.componentInstance;
            let val1 = 99;
            testObjComponent.setValue1(val1);
            let val2 = undefined;
            testObjComponent.setValue2(val2);

            objFixture.detectChanges();

            let el = objFixture.nativeElement.querySelector('h1');
            // console.log('actual value', el);

            expect(el).toBeNull();
        });
        it('should display text when value is expression evaluating to true', () => {
            let expected = true ||  false;
            testComponent.setValue(expected);

            fixture.detectChanges();

            let actual = fixture.nativeElement.querySelector('h1').innerText;
            // console.log('actual value', actual);

            expect(actual).toEqual('true');
        });

    });

});
