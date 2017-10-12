import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-navigation',
  styles: [require('./header-navigation.style.scss')],
  template: require('./header-navigation.template.html')
})

export class HeaderNavigationComponent {
  searchQuery: string = '';

  constructor(public router: Router) {}

  /**
   * Whenever the form is submitted, perform a search and then reset the search
   * query.
   */
  handleFormSubmission() {
    this.search();
    this.resetSearchQuery();
  }

  /**
   * Reset the search query to a blank value.
   */
  resetSearchQuery() {
    this.searchQuery = '';
  }

  /**
   * Navigate to the search results page.
   *
   * @return {void}
   */
  search() {
    this.router.navigateByUrl('/search?q=' + this.searchQuery);
  }

  /**
   * Whether we are on an Policy Guide page.
   */
  isPolicyGuide() {
    return this.router.isActive('/policy-guide', false);
  }
}
