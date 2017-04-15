import { APP_BASE_HREF } from '@angular/common';
import { inject, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';

import { Angulartics2, Angulartics2Module } from 'angulartics2';

import { BannerArtComponent } from './banner-art';
import { ExternalLinkDirective } from '../../directives/external-link';
import { HomeComponent } from './';
import { ModalComponent } from '../modal';
import { ModalService } from '../../services/modal';
import { SeoService } from '../../services/seo';
import { StateService } from '../../services/state';

describe('HomeComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BannerArtComponent,
        ExternalLinkDirective,
        HomeComponent,
        ModalComponent
      ],
      imports: [
        Angulartics2Module.forRoot(),
        RouterModule.forRoot([])
      ],
      providers: [
        Angulartics2,
        {provide: APP_BASE_HREF, useValue: '/'},
        { provide: Location, useClass: SpyLocation },
        ModalService,
        SeoService,
        StateService
      ]
    });

    this.fixture = TestBed.createComponent(HomeComponent);
    this.homeComponent = this.fixture.componentInstance;
  });

  it('should have a heading', () => {
    expect(this.homeComponent.url).toEqual('https://pif.gov');
  });
});
