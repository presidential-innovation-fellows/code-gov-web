import { APP_BASE_HREF } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HomeHeaderNavigationComponent } from './home-header-navigation.component';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

describe('HomeHeaderNavigationComponent', () => {
  describe('component logic', () => {
    let fixture: ComponentFixture<HomeHeaderNavigationComponent>;
    let component: HomeHeaderNavigationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            RouterModule.forRoot([])
          ],
          declarations: [ HomeHeaderNavigationComponent ],
          providers: [
            { provide: APP_BASE_HREF, useValue: '/' },
          ],
          schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        });
        fixture = TestBed.createComponent(HomeHeaderNavigationComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should have defined HomeHeaderNavigationComponent instance', () => {
        expect(component).toBeDefined();
    });
  });
});
