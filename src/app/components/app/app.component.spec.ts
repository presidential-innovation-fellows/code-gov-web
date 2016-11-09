import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AppComponent } from './index';
import { AgencyService } from '../../services/agency';
import { LanguageIconPipe } from '../../pipes/language-icon';
import { PluralizePipe } from '../../pipes/pluralize';
import { ReposService } from '../../services/repos';
import { SeoService } from '../../services/seo';
import { TruncatePipe } from '../../pipes/truncate';
import { StateService } from '../../services/state';


describe('AgencyComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LanguageIconPipe,
        PluralizePipe,
        TruncatePipe
      ],
      imports: [
        HttpModule,
        RouterModule.forRoot([])
      ],
      providers: [
        AgencyService,
        ReposService,
        SeoService,
        StateService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });

    this.fixture = TestBed.createComponent(AppComponent);
    this.appComponent = this.fixture.componentInstance;
  });

  describe('destroy', () => {
    it('should unsubscribe from router events on destroy', () => {
      this.fixture.detectChanges();
      spyOn(this.appComponent.eventSub, 'unsubscribe');
      this.fixture.destroy()
      expect(this.appComponent.eventSub.unsubscribe).toHaveBeenCalled();
    });
  });
});
