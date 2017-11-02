import { APP_BASE_HREF, Location } from '@angular/common';
import {
  Component,
  Type,
  Compiler,
  NgModuleFactoryLoader,
  Injector
} from '@angular/core';
import {
  Router,
  Routes,
  UrlSerializer,
  NavigationStart,
  NavigationEnd,
  Event
} from '@angular/router';
import { Angulartics2Module, Angulartics2, Angulartics2GoogleTagManager } from 'angulartics2';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppComponent } from './app.component';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

class MockRouter {
  routerState = {root: ''};
  private rootComponentType: Type<any>;

  private events: Observable<Event>;

  constructor() {
      this.events = Observable.of(new NavigationStart(2, ''));
  }

  createUrlTree() {
      return {};
  }

  serializeUrl() {
      return 'foo';
  }
}

describe('AppComponent', () => {

 describe('component logic', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                Angulartics2Module.forRoot(),
                HttpModule,
                RouterModule.forRoot([]),
            ],
            declarations: [ AppComponent ],
            providers: [
                Angulartics2,
                Angulartics2GoogleTagManager,
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: Router, useClass: MockRouter}
          ]
        });
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should have defined AppComponent instance', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should have defined router event subscription', () => {
        fixture.detectChanges();
        expect(component.eventSub).toBeDefined();
    });

    it('should unsubscribe from router events when component is destroyed', () => {
        fixture.detectChanges();
        spyOn(component.eventSub, 'unsubscribe');
        fixture.destroy();
        expect(component.eventSub.unsubscribe).toHaveBeenCalled();
    });


 });

 describe('component template', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    beforeEach(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [
                Angulartics2Module.forRoot(),
                HttpModule,
                RouterModule.forRoot([]),
            ],
            declarations: [AppComponent],
            providers: [
                Angulartics2,
                Angulartics2GoogleTagManager,
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: Router, useClass: MockRouter}
          ]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should have header, nav and footer elements', () => {
        fixture.detectChanges();
        let head = fixture.nativeElement.querySelector('header');
        let nav = fixture.nativeElement.querySelector('nav');
        let foot = fixture.nativeElement.querySelector('footer');

        expect(head).toBeDefined();
        expect(nav).toBeDefined();
        expect(foot).toBeDefined();
    });

    it('should have a main element with router-outlet child', () => {
        fixture.detectChanges();
        let outlet = fixture.nativeElement.querySelector('main router-outlet');

        expect(outlet).toBeDefined();
    });

 });

});
