import { Component, Input } from '@angular/core';
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
  private _results = [];
  @Input() private pageSize = 10;
  private currentPage = 1;
  private subscription: Subscription;
  private isLoading = true;
  private loadedResults = [];
  private PAGE_SIZE = 10;

  /**
   * Constructs a RepoListComponent.
   *
   * @constructor
   * @param {SearchService} searchService - A service for searching repositories
   */
  constructor(
    private searchService: SearchService,
  ) {
  }

  ngOnInit() {
    this.subscription = this.searchService.searchResultsReturned$.subscribe(results => {
      if (results !== null) {
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

  get results(): Array<any> {
    // transform value for display
    return this._results;
  }

  @Input()
  set results(results: Array<any>) {
    this.loadedResults = results.slice(0, this.PAGE_SIZE);

    this._results = results;
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
   * Returns the index (1-based) of the first item on the page.
   */
  getMinPageIndex() {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  /**
   * Returns the index (1-based) of the last item on the page.
   */
  getMaxPageIndex() {
    return Math.min((this.currentPage - 1) * this.pageSize + this.pageSize, this.results.length);
  }

  /**
   * Executed when the user scrolls to a point in the mobile view where we need
   * to fetch more results from the infinite scroll mechanism.
   */
  onScroll() {
    this.loadedResults = this.results.slice(0, this.loadedResults.length + this.PAGE_SIZE);
  }
}
