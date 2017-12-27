import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
const compact = require('lodash/compact');
const flatten = require('lodash/flatten');
const uniq = require('lodash/uniq');

import { SearchService } from '../../services/search';
import { StateService } from '../../services/state';

/**
 * Class representing a search results page for repositories.
 */

@Component({
  selector: 'search-results',
  styles: [require('./search-results.styles.scss')],
  template: require('./search-results.template.html'),
  encapsulation: ViewEncapsulation.None,
})

export class SearchResultsComponent {
  public searchQuery: string = '';
  private queryValue: string = '';
  private routeSubscription: Subscription;
  private results = [];
  private filteredResults = [];
  private searchResultsSubscription: Subscription;
  private total: number;
  private isLoading = true;
  private filterForm: FormGroup;
  private metaForm: FormGroup;
  private pageSize = 10;
  private sort = 'relevance';

  /**
   * Constructs a SearchResultsComponent.
   *
   * @constructor
   * @param {StateService} stateService - A service for managing the state of the site
   * @param {ActivatedRoute} activatedRoute - The currently active route
   * @param {SearchService} searchService - A service for searching repositories
   */
  constructor(
    public stateService: StateService,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
  ) {
    this.filterForm = formBuilder.group({
      languages: {},
      licenses: {},
      usageTypes: {},
    });

    this.filterForm.setControl('usageTypes', this.formBuilder.group({
      openSource: false,
      governmentWideReuse: false,
    }));

    this.filterForm.valueChanges.subscribe(data => {
      this.filteredResults = this.sortResults(this.filterResults(this.results));
    });

    this.metaForm = formBuilder.group({
      pageSize: this.pageSize,
      sort: this.sort,
    });

    this.metaForm.valueChanges.subscribe(data => {
      this.pageSize = data.pageSize;
      this.sort = data.sort;

      this.filteredResults = this.sortResults(this.filterResults(this.results));
    });
  }

  ngOnInit() {
    this.stateService.set('section', 'explore-code');

    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (response: any) => {
        this.queryValue = response.q;
        this.searchService.search(this.queryValue);
      }
    );

    this.searchResultsSubscription = this.searchService.searchResultsReturned$.subscribe(results => {
      if (results !== null) {
        this.results = results;
        this.total = this.searchService.total;
        this.buildFormControl('languages', this.getLanguages());
        this.buildFormControl('licenses', this.getLicenses());
        this.isLoading = false;
      }
    });
  }

  /**
   * On removal from the DOM, unsubscribe from URL updates.
   */
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.searchResultsSubscription.unsubscribe();
  }

  buildFormControl(property, values) {
    this.filterForm.setControl(property, this.formBuilder.group(values.reduce((obj, key) => {
      obj[key] = this.formBuilder.control(false);
      return obj;
    }, {})));
  }

  sortResults(results) {
    if (this.metaForm.value.sort === 'date') {
      return results.sort((a, b) => {
        // Move entries without dates to the very end.
        if (!a.date) {
          return -1;
        }

        if (!b.date) {
          return 1;
        }

        return a.date.lastModified > b.date.lastModified ? -1 : a.date.lastModified === b.date.lastModified ? 0 : 1;
      });
    } else if (this.metaForm.value.sort === 'relevance') {
      return results.sort((a, b) => {
        return a.score > b.score ? -1 : a.score === b.score ? 0 : 1;
      });
    }
  }

  getFilteredValues(property) {
    return Object.keys(this.filterForm.value[property]).filter(key => this.filterForm.value[property][key]);
  }

  filterLanguages(result) {
    const filteredLanguages = this.getFilteredValues('languages');

    if (filteredLanguages.length > 0) {
      if (Array.isArray(result.languages)) {
        return filteredLanguages.every(l => result.languages.includes(l));
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  filterLicenses(result) {
    const filteredLicenses = this.getFilteredValues('licenses');

    if (!result.permissions || !result.permissions.licenses || filteredLicenses.length === 0) {
      return true;
    }

    if (Array.isArray(result.permissions.licenses)) {
      return filteredLicenses.every(l => result.permissions.licenses.map(license => license.name).includes(l));
    } else {
      return false;
    }
  }

  filterUsageTypes(result) {
    const filteredUsageTypes = this.getFilteredValues('usageTypes');

    if (!result.permissions || !result.permissions.usageType || filteredUsageTypes.length === 0) {
      return true;
    }

    if (result.permissions.usageType) {
      return filteredUsageTypes.every(ut => result.permissions.usageType === ut);
    } else {
      return false;
    }
  }

  filterResults(results) {
    return results.filter(this.filterLanguages.bind(this))
      .filter(this.filterLicenses.bind(this))
      .filter(this.filterUsageTypes.bind(this));
  }

  getLanguages() {
    return uniq(compact(flatten(this.results.map(result => result.languages))));
  }

  getLicenses() {
    return uniq(compact(flatten(this.results.map(
      result => result.permissions && result.permissions.licenses ?
        result.permissions.licenses.map(license => license.name) : []))));
  }
}
