import { CommonModule } from '@angular/common';
import { inject, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Injectable } from '@angular/core';
import { WindowRef } from './window.service';


describe('WindowService', () => {
    describe('Real WindowRef', () => {
        let fixture: ComponentFixture<DummyComponent>;
        let component: DummyComponent;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ CommonModule ],
                declarations: [ DummyComponent ],
                providers: [ WindowRef ]
            });

            fixture = TestBed.createComponent(DummyComponent);
            component = fixture.componentInstance;
            TestBed.compileComponents();
        });

        it('should access the native window object', () => {
            // try {
            fixture.detectChanges();
            let win = component.windowRef.nativeWindow;
            expect(win).toBeDefined();
            // } catch (error) {
            //     console.log('Error message', error.message);
            //     console.log('Error', error);
            // }
        });
     });

    describe('Mock WindowRef', () => {
        let fixture: ComponentFixture<DummyComponent>;
        let component: DummyComponent;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ CommonModule ],
                declarations: [ DummyComponent ],
                providers: [ { provide: WindowRef, useClass: MockWindowRef} ]
            });

            fixture = TestBed.createComponent(DummyComponent);
            component = fixture.componentInstance;
            TestBed.compileComponents();
        });

        it('should access a mock window ref object', () => {
            // try {
            fixture.detectChanges();
            let win: any = component.windowRef.nativeWindow;
            expect(win).toBeDefined();
            expect(win.document).toBeDefined();
            expect(win.document.body.scrollTop).toEqual(100);
            // } catch (error) {
            //     console.log('Error message', error.message);
            //     console.log('Error', error);
            // }
        });

    });

});

@Component({
  template: ''
})
class DummyComponent {
    windowRef: WindowRef;
    constructor(private _windowRef: WindowRef) {
        this.windowRef = _windowRef;
    }
}

export class MockWindowRef extends WindowRef {
  constructor() {
    super();
  }

   get nativeWindow(): Window {
      return <Window>{document: {body: {scrollTop: 100}}};
   }
}
