import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { inject, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Rx';

import { AgencyComponent } from './index';
import { AgencyService } from '../../../services/agency';
import { LanguageIconPipe } from '../../../pipes/language-icon';
import { PluralizePipe } from '../../../pipes/pluralize';
import { ReposService } from '../../../services/repos';
import { SeoService } from '../../../services/seo';
import { TruncatePipe } from '../../../pipes/truncate';

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.params = Observable.of({id: 'DOL'});
  }
}

describe('AgencyComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AgencyComponent,
        LanguageIconPipe,
        PluralizePipe,
        TruncatePipe
      ],
      imports: [
        HttpModule,
        RouterModule
      ],
      providers: [
        AgencyService,
        ReposService,
        SeoService,
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    });

    this.fixture = TestBed.createComponent(AgencyComponent);
    this.agencyComponent = this.fixture.componentInstance;
  });

  describe('checkRepos', () => {
    it('returns false when repos do not exist', () => {
      let repos = [];
      expect(this.agencyComponent.checkRepos(repos)).toBe(false);
    });

    it('returns true when repos exist', () => {
      let repos = [{id: 1, name: 'Repo'}];
      expect(this.agencyComponent.checkRepos(repos)).toBe(true);
    });
  });

  describe('filterByAgency', () => {
    it('returns false when a repo’s Agency does not match', () => {
      spyOn(this.agencyComponent, 'agencyId').and.returnValue('DOL');
      let repo = {agency: 'AAA'};

      expect(this.agencyComponent.filterByAgency(repo)).toBe(false);
    });

    it('returns true when a repo’s Agency matches', () => {
      spyOn(this.agencyComponent, 'agencyId').and.returnValue('DOL');
      let repo = {agency: 'DOL'};

      expect(this.agencyComponent.filterByAgency(repo)).toBe(true);
    });
  });

  describe('destroy', () => {
    it('should unsubscribe from router events on destroy', () => {
      this.fixture.detectChanges();
      spyOn(this.agencyComponent.eventSub, 'unsubscribe');
      this.fixture.destroy();
      expect(this.agencyComponent.eventSub.unsubscribe).toHaveBeenCalled();
    });
  });
});
