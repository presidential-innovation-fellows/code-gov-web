import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

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
  private subscription: Subscription;

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
  ) {
    this.stateService.set('section', 'explore-code');

    this.subscription = this.activatedRoute.queryParams.subscribe(
      (response: any) => {
        this.queryValue = response.q;
        this.searchService.search(this.queryValue);
      }
    );
  }

  /**
   * On removal from the DOM, unsubscribe from URL updates.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
