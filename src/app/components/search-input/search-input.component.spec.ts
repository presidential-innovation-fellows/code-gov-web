import { APP_BASE_HREF } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SearchInputComponent } from './search-input.component';
import { LunrSearchService, SearchService } from '../../services/search';
import { AgenciesIndexService, ReleasesIndexService } from '../../services/indexes';
import { LunrTermService, TermService } from '../../services/term';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

describe('SearchInputComponent', () => {
  describe('component logic', () => {
    let fixture: ComponentFixture<SearchInputComponent>;
    let component: SearchInputComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([]),
          FormsModule,
          HttpModule,
        ],
        declarations: [
          SearchInputComponent,
        ],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' },
          { provide: SearchService, useClass: LunrSearchService },
          { provide: TermService, useClass: LunrTermService },
          AgenciesIndexService,
          ReleasesIndexService,
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA,
          NO_ERRORS_SCHEMA,
        ],
      });
      fixture = TestBed.createComponent(SearchInputComponent);
      component = fixture.debugElement.children[0].componentInstance;
      fixture.detectChanges();
    });

    it('should have defined SearchInputComponent instance', () => {
      expect(component).toBeDefined();
    });

    describe('hasQuery()', () => {
      it('should be true when there is a query value', () => {
        component.queryInputValue = 'test';

        expect(component.hasQuery()).toBe(true);
      });

      it('should be false when there is not a query value', () => {
        component.queryInputValue = '';

        expect(component.hasQuery()).toBe(false);
      });
    });
  });
});
