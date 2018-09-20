import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MobileService } from '../../services/mobile';
import { SearchInputComponent } from '../search-input';

import { toRouterLink, Link } from '../../utils/urls';

import { content, title } from '../../../../config/code-gov-config.json';

interface MenuOption {
  links: Link[];
  expanded?: boolean;
}

@Component({
  selector: 'header-navigation',
  styles: [require('./header-navigation.style.scss')],
  template: require('./header-navigation.template.html'),
  host: {
    '(window:scroll)': 'onScrollHandler($event)',
  },
})
export class HeaderNavigationComponent {
  searchQuery: string = '';
  isAtTop: boolean = true;
  isSearchBoxShown: boolean = false;
  searchBoxActiveSubscription: Subscription;
  color: string = 'white';
  dropdownSearchBox: boolean = true;
  headerContent: any = content.header;
  menu: MenuOption[];
  expanded: boolean = false;
  height: string = '';
  title: string = title;
  @ViewChild(SearchInputComponent) child: SearchInputComponent;


  constructor(
    public router: Router,
    private mobileService: MobileService,
  ) {
    this.searchBoxActiveSubscription = this.mobileService.activeSearchBox$.subscribe(
      isSearchBoxShown => this.isSearchBoxShown = isSearchBoxShown);

    this.menu = content.header.menu.map(option => {
      if (option.links) {
        option.links.forEach(link => {
          link.routerLink = toRouterLink(link.url);
        });
        option.expanded = false;
      } else if (option.url) {
        option.routerLink = toRouterLink(option.url);
      }
      return option;
    });
  }

  ngAfterContentInit() {
    Array.prototype.slice.call(document.querySelectorAll("header ul a[href='#']"))
    .forEach(a => a.href = window.location.hash);
  }

  ngOnDestroy() {
    this.searchBoxActiveSubscription.unsubscribe();
  }

  /**
   * Whenever the form is submitted, perform a search and then reset the search
   * query.
   */
  handleFormSubmission() {
    if (this.searchQuery && this.searchQuery.length > 0) {
      this.search();
      this.resetSearchQuery();
    } else {
      console.log('No search terms were entered, so do nothing');
    }
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

  /**
   * Triggers whenever the window is scrolled.
   *
   * @param $event - the scrolling event
   */
  onScrollHandler($event) {
    const top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    this.isAtTop = top === 0;
  }

  showSearchBox() {
    this.mobileService.showSearchBox();
    this.child.focus();
  }

  hideSearchBox() {
    this.mobileService.hideSearchBox();
    this.child.blur();
  }

  toggleSearchBox() {
    if (this.isSearchBoxShown) {
      this.hideSearchBox();
    } else {
      this.showSearchBox();
    }
  }

  closeAllMenus() {
    this.expanded = false;
    this.menu.forEach(menuOption => {
      menuOption.expanded = false;
    });
    this.height = null;
  }

  onClickMenuOption(selected, event) {

    // make sure to close all other menuOptions
    this.menu.forEach(menuOption => {
      if (menuOption !== selected) {
        menuOption.expanded = false;
      }
    });

    selected.expanded = !selected.expanded;

    this.expanded = this.menu.filter(option => option.expanded).length > 0;

    this.updateMenuSize(event);
  }

  updateMenuSize(event) {
    if (this.expanded) {
      let nav = document.querySelector('header.main nav.main');
      let computedStyle = window.getComputedStyle(nav);
      let paddingTop = Number(computedStyle['padding-top'].replace('px', ''));
      let paddingBottom = Number(computedStyle['padding-bottom'].replace('px', ''));
      let padding = paddingTop + paddingBottom;
      let navHeight = nav.querySelector('ul').clientHeight;
      let selectedSubMenu = event.target.nextElementSibling;

      // need to directly add the class even though Angular will take care of it
      // because it needs to be done synchronously before getting height from
      // menu when it appears
      let li = event.target.parentElement;
      li.className = 'expanded';
      let dropdownHeight = selectedSubMenu.clientHeight;
      this.height = padding + navHeight + dropdownHeight;
    } else {
      this.height = null;
    }
  }




}
