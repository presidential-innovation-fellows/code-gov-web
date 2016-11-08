import { inject, TestBed } from '@angular/core/testing';

import { BannerArtComponent } from './banner-art';
import { ExternalLinkDirective } from '../../directives/external-link';
import { HomeComponent } from './';
import { ModalModule } from '../modal';
import { ModalService } from '../../services/modal';
import { SeoService } from '../../services/seo';
import { StateService } from '../../services/state';

describe('HomeComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule
      ],
      declarations: [
        BannerArtComponent,
        ExternalLinkDirective,
        HomeComponent
      ],
      providers: [
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
