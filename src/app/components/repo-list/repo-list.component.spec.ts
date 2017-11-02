import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Observable } from 'rxjs/Observable';

import { LanguageIconPipe } from '../../pipes/language-icon';
import { PluralizePipe } from '../../pipes/pluralize';
import { RepoListItemComponent } from '../repo-list-item';
import { RepoListComponent } from './';
import { SearchService } from '../../services/search';
import { TruncatePipe } from '../../pipes/truncate';

class MockRouter {
  url: string;
  constructor() {
    this.url = '/explore-code/';
  }

  navigateByUrl(arg) {
    return true;
  }
}

class MockSearchService {
  result = {total: 3, repos: [{name: 'GSA'}, {name: 'GSA 2'}, {name: 'GSA 3'}]};

  search(arg) {
    return Observable.of(this.result);
  }

  nextPage() {
    
  }
}

describe('RepoListComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LanguageIconPipe,
        PluralizePipe,
        RepoListComponent,
        RepoListItemComponent,
        TruncatePipe
      ],
      imports: [
        HttpModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SearchService, useClass: MockSearchService }
      ]
    });

    this.fixture = TestBed.createComponent(RepoListComponent);
    this.repoListComponent = this.fixture.componentInstance;
  });

  describe('onScroll', () => {
    xit('calls the Search Service nextPage function',
      inject([SearchService], searchService => {
        spyOn(searchService, 'nextPage').and.callThrough();

        this.repoListComponent.onScroll();
        expect(searchService.nextPage).toHaveBeenCalled();
      }
    ));
  });
});
