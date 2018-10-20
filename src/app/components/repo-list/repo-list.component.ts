import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { hashString } from '../../utils/hash';

/**
 * Class representing a list of repositories.
 */

@Component({
  selector: 'repo-list',
  template: require('./repo-list.template.html'),
  styles: [require('./repo-list.styles.scss')],
})

export class RepoListComponent {
  @Input() private pageSize = 10;
  @Input() private results;
  private currentPage = 1;
  private subscription: Subscription;
  private loadedResults = [];
  private PAGE_SIZE = 10;
  private resultsHash;

  /**
   * On removal from the DOM, unsubscribe from events.
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * When the current page has updated.
   *
   * @return {void}
   */
  onPageChange(page: number) {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  /* We have to do something weird here.  Basically, angular doesn't trigger
    ngOnChanges on when the properties on an input property changes.  ngOnChanges
    only checks if an object changes.  If we sort the results, this isn't technically
    a new object, just the same old object with a different order.

    The code below basically hashes the results and triggers a new load of the
    results for mobile if the hash has changed.
  */
  ngDoCheck() {
    const newHash = hashString(JSON.stringify(this.results));
    if (newHash !== this.resultsHash) {
      this.loadedResults = this.results.slice(0, this.PAGE_SIZE);
    }
    this.resultsHash = newHash;
  }

  /**
   * When the list has some repositories.
   *
   * @return {void}
   */
  hasRepos() {
    return this.results && this.results.length > 0;
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
