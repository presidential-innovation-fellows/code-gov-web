import { APP_BASE_HREF } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HeaderNavigationComponent } from './header-navigation.component';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { MobileService } from '../../services/mobile';

describe('HeaderNavigationComponent', () => {
  describe('component logic', () => {
    let fixture: ComponentFixture<HeaderNavigationComponent>;
    let component: HeaderNavigationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            RouterModule.forRoot([]),
          ],
          declarations: [ HeaderNavigationComponent ],
          providers: [
            { provide: APP_BASE_HREF, useValue: '/' },
            MobileService,
          ],
          schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        });
        fixture = TestBed.createComponent(HeaderNavigationComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should have defined HeaderNavigationComponent instance', () => {
        expect(component).toBeDefined();
    });

    it('resetSearchQuery() should set the text to empty', () => {
      component.searchQuery = 'test';
      component.resetSearchQuery();

      expect(component.searchQuery).toEqual('');
    });

    it('should set the URL whenever a search is performed', () => {
      spyOn(component.router, 'navigateByUrl');

      component.searchQuery = 'test';
      component.search();

      expect(component.router.navigateByUrl).toHaveBeenCalledWith('/search?q=test');
    });
  });
});
