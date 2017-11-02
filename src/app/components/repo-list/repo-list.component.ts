import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from '../../services/search';

/**
 * Class representing a list of repositories.
 */

@Component({
  selector: 'repo-list',
  template: require('./repo-list.template.html'),
  styles: [require('./repo-list.styles.scss')],
})

export class RepoListComponent {
  private results = [];
  private subscription: Subscription;
  private total: number;
  private isLoading = true;

  /**
   * Constructs a RepoListComponent.
   *
   * @constructor
   * @param {SearchService} searchService - A service for searching repositories
   */
  constructor(
    private searchService: SearchService,
  ) {
    this.subscription = this.searchService.searchResultsReturned$.subscribe(results => {
      if (results !== null) {
        this.results = results;
        this.total = this.searchService.total;
        this.isLoading = false;
      }
    });
  }

  /**
   * On removal from the DOM, unsubscribe from events.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * When the list has some repositories.
   *
   * @return {void}
   */
  hasRepos() {
    return this.results.length > 0;
  }

  /**
   * When the infinite scroll gets to its loading point, load the next
   * page of results.
   *
   * @return {void}
   */
  onScroll() {
    this.searchService.nextPage();
  }
}
