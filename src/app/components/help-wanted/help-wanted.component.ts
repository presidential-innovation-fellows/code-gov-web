import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import * as licenseList from 'spdx-license-list';
import { ClientService } from '../../services/client';
import { StateService } from '../../services/state';
import * as allLanguages from '../../../enums/languages.json';
import { BaseFilterPageComponent } from '../base-filter-page';
import { content, images } from '../../../../config/code-gov-config.json';

import { HelpWantedService } from '../../services/help-wanted';
import { Option } from './help-wanted.option';

@Component({
  selector: 'help-wanted',
  styles: [require('./help-wanted.styles.scss')],
  template: require('./help-wanted.template.html'),
  encapsulation: ViewEncapsulation.None,
})

export class HelpWantedComponent extends BaseFilterPageComponent {
  public content: any = content.help_wanted;
  public bannerImage;

  constructor(
    public stateService: StateService,
    public activatedRoute: ActivatedRoute,
    public clientService: ClientService,
    public sanitizer: DomSanitizer,
    public hostElement: ElementRef,
    public cd: ChangeDetectorRef,
    private helpWantedService: HelpWantedService
  ) {
    super();
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 750;
    this.bannerImage = this.sanitizer.bypassSecurityTrustStyle(`url('${images.background}')`);

    this.helpWantedService.getTasks().subscribe(tasks => {

      /* sort by last modified, but only need to do this once, because there are no other sort options */
      this.results = tasks
        .sort((a, b) => {
          const aTime = a.date && a.date.lastModified ? new Date(a.date.lastModified).getTime() :  -10e10;
          const bTime = b.date && b.date.lastModified ? new Date(b.date.lastModified).getTime() :  -10e10;
          return Math.sign(bTime - aTime) || 0;
        });

      this.total = tasks.length;

      super.setFederalAgencies();
      super.setLanguages();
      super.setLicenses();
      super.setTypes();
      this.cd.detectChanges();
    });
  }

}
