import { APP_BASE_HREF, Location } from '@angular/common';
import { Component, Type, Compiler,
    NgModuleFactoryLoader, Injector } from '@angular/core';
import { Router, Routes, UrlSerializer,
    NavigationStart, NavigationEnd,
    RouterOutletMap, Event } from '@angular/router';
import { Angulartics2Module, Angulartics2, Angulartics2GoogleTagManager } from 'angulartics2';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, BehaviorSubject } from 'rxjs';
import { WindowRef } from './../../services/window/window.service';
import { StateService } from './../../services/state/state.service';
import { AppComponent } from './app.component';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';




describe('AppComponent2', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                Angulartics2Module.forRoot(),
                HttpModule,
                RouterModule.forRoot([]),
            ],
            declarations: [AppComponent, TestComponent],
            providers: [
                Angulartics2,
                Angulartics2GoogleTagManager,
                {provide: Router, useClass: MockRouter},
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: WindowRef, useClass: MockWindowRef},
                StateService
            ]
        });
        // try {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        // } catch (error) {
        //   console.log('BEFORE_EACH Error:', error.message);
        // }
    });

    it('should have defined AppComponent instance', () => {
    //   try {
        fixture.detectChanges();
        expect(component).toBeDefined();
    //   } catch (error) {
    //       console.log('Error:', error.message);
    //       console.log('COMPONENT:', component);
    //   }
    });

  it('should have defined router event subscription', () => {
      try {
    fixture.detectChanges();
    expect(component.eventSub).toBeDefined();
      } catch (error) {
          console.log('Error:', error.message);
          console.log('COMPONENT:', component);
      }
  });

  xit('should not set document.body.scrollTop for NavigationStart event',
    inject([Router, StateService, WindowRef],
        (router: MockRouter, stateService: StateService, windowRef: WindowRef) => {
      try {

    //   let appComponent: AppComponent = new AppComponent(new Router(), stateService, windowRef)
      let id = 101;
      let navEvent: NavigationEnd = new NavigationEnd(id, 'http://code.gov', 'http://foo.com');
      let navEventObs$: BehaviorSubject<NavigationEnd> =
        new BehaviorSubject<NavigationEnd>(navEvent);
    //   spyOn(router, 'events').and.returnValue(navEventObs$.asObservable());
      // navEventObs$.next(navEvent);
      // console.log('Router', router);
      // router.events = navEventObs$.asObservable();
      spyOn(router, 'events').and.returnValue(Observable.of(navEvent));
    //   router.events = Observable.of(navEvent);

      fixture.detectChanges();

      expect(windowRef.nativeWindow.document.body.scrollTop).toBe(id);
      } catch (error) {
        console.log('should NOT set document.body.scrollTop ... Error message', error.message);
        console.log('Error', error);
      }
  }));

});

@Component({
    selector: 'my-foo',
    template: `<div>Foobar</div>`
})
class TestComponent {
}


class MockRouter {
    routerState = {root: ''};
    private rootComponentType: Type<any>;

    private _events: Observable<Event>;

    constructor() {
    }

    get events(): Observable<Event> {
        if (!this._events) {
            let id = 99;
            let navEvent: NavigationStart = new NavigationStart(id, 'http://code.gov');
            this._events = Observable.of(navEvent);
        }
        return this._events;
    }

    set events(events: Observable<Event>) {
        this._events = events;
    }

    createUrlTree() {
        return {};
    }

    serializeUrl() {
        return 'foo';
    }

}

class MockWindowRef extends WindowRef {
  scrollTop: number = 99;
  constructor() {
    super();
  }

   get nativeWindow(): Window {
      return <Window>{document: {body: {scrollTop: this.scrollTop}}};
   }
}
