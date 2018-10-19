import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
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


@Component({
  selector: 'browse-projects',
  styles: [require('./browse-projects.styles.scss')],
  template: require('./browse-projects.template.html'),
  encapsulation: ViewEncapsulation.None,
})

export class BrowseProjectsComponent extends BaseFilterPageComponent {
  public content: any = content.browse_projects;
  public bannerImage;

  public sortOptions: String[] = ['Data Quality', 'A-Z', 'Last Updated'];
  public selectedSortOption: String = 'Data Quality';

  constructor(
    public stateService: StateService,
    public activatedRoute: ActivatedRoute,
    public clientService: ClientService,
    public sanitizer: DomSanitizer,
    public hostElement: ElementRef,
    public cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 750;
    this.bannerImage = this.sanitizer.bypassSecurityTrustStyle(`url('${images.background}')`);

    this.stateService.set('section', 'browse-projects');

    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (response: any) => {
        if (this.isLoading) {
          const initialAgencies = response.agencies ? response.agencies.split(',') : [];
          this.queryValue = ''; // blank for all repos
          this.clientService.search(this.queryValue, 10000).subscribe(data => {
            let repos = data.repos;

            this.results = repos;
            this.total = repos.length;
            this.isLoading = false;

            super.setFederalAgencies(initialAgencies);
            if (initialAgencies.length > 0) {
              const acronymToName = {};
              this.results.forEach(repo => {
                const agency = repo.agency;
                acronymToName[agency.acronym] = agency.name;
              });
              initialAgencies.forEach(acronym => {
                this.filterTags.push({
                  category: 'Federal Agency',
                  name: acronymToName[acronym],
                  value: acronym
                });
              });
            }


            super.setLanguages();
            super.setLicenses();
            this.cd.detectChanges();
          });
        }
      }
    );
  }

}
