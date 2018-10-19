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

import { content, images } from '../../../../config/code-gov-config.json';

const licenseNameToId = {};
const licenseIdToName = {};
Object.entries(licenseList).forEach(values => {
  const [licenseId, licenseData] = values;
  const licenseName = licenseData.name;
  licenseNameToId[licenseName] = licenseId;
  licenseIdToName[licenseId] = licenseName;
});


@Component({
  selector: 'base-filter-page',
  styles: [require('./base-filter-page.styles.scss')],
  template: ''
})

export class BaseFilterPageComponent {
  public searchQuery: string = '';
  public bannerImage: SafeStyle;
  public queryValue: string = '';
  public routeSubscription: Subscription;
  public results = [];
  public finalResults = [];
  public total: number;
  public isLoading = true;
  public pageSize = 10;
  public agencies = [];
  public licenses = [];
  public languages = [];
  public hostElement: ElementRef;
  public filterTags = [];
  public types = [];

  // added by children
  public sortOptions: String[];
  public selectedSortOption: String;

  isMobile: boolean;
  sideNavBarWidth: string = '0';

  /**
   * On removal from the DOM, unsubscribe from URL updates.
   */
  public ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public getFilterBoxValues(title) {
    try {
      const element = this.hostElement.nativeElement.querySelector(`filter-box[title='${title}']`);
      if (element) {
        return element.values;
      } else {
        return [];
      }
    } catch (error) {
      console.warn(`getFilterBoxValues caught the following error with ${title}`, error);
      return [];
    }
  }

  public filterUsageType(result) {
    const selectedUsageTypes = this.getFilterBoxValues('Usage Type');

    if (selectedUsageTypes.length === 0) {
      return true;
    } else {
      return selectedUsageTypes.indexOf(result.permissions.usageType) > -1;
    }
  }

  public filterType(result) {
    const selectedTypes = this.getFilterBoxValues('Type');

    if (selectedTypes.length === 0) {
      return true;
    } else {
      return selectedTypes.indexOf(result.type) > -1;
    }
  }

  public filterOrgType(result) {
    const orgTypes = this.getFilterBoxValues('Organization Type');
    if (orgTypes.length === 0) {
      return true;
    } else {
      return orgTypes.indexOf(result.orgType || 'federal') > -1;
    }
  }

  public filterFederalAgency(result) {
    const names = this.getFilterBoxValues('Federal Agency');
    if (names.length === 0) {
      return true;
    } else if (names.length > 0) {
      return names.indexOf(result.agency.acronym) > -1;
    }
  }

  public filterSkillLevel(result) {
    const names = this.getFilterBoxValues('Skill Level');
    if (names.length === 0) {
      return true;
    } else if (names.length > 0) {
      return names.indexOf(result.skill) > -1;
    }
  }

  public filterTimeRequired(result) {
    const names = this.getFilterBoxValues('Time Required');
    if (names.length === 0) {
      return true;
    } else if (names.length > 0) {
      return names.indexOf(result.effort) > -1;
    }
  }

  public filterLanguages(result) {
    const selectedLangs = this.getFilterBoxValues('Language');

    if (selectedLangs.length === 0) {
      return true;
    } else if (selectedLangs.length > 0) {
      const repoLanguages = result.languages;
      if (Array.isArray(repoLanguages)) {
        return repoLanguages.some(repoLang => selectedLangs.indexOf(repoLang) > -1);
      }
    }
  }

  public filterLicenses(result) {
    const selectedLicenseIds = this.getFilterBoxValues('License');
    const selectedLicenseNames = selectedLicenseIds.map(id => licenseIdToName[id]);
    let selectedLicenses = Array.from(new Set(selectedLicenseIds.concat(selectedLicenseNames)));

    if (selectedLicenseIds.length === 0) {
      return true;
    } else if (selectedLicenseIds.length > 0) {
      if (Array.isArray(result.permissions.licenses)) {
        const objLicenseNames = result.permissions.licenses.map(license => license.name);
        return selectedLicenses.some(l => objLicenseNames.indexOf(l) > -1);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public filterResults() {
    this.finalResults = this.results
      .filter(this.filterLanguages.bind(this))
      .filter(this.filterLicenses.bind(this))
      .filter(this.filterUsageType.bind(this))
    //  .filter(this.filterOrgType.bind(this))
      .filter(this.filterType.bind(this))
      .filter(this.filterSkillLevel.bind(this))
      .filter(this.filterTimeRequired.bind(this))
      .filter(this.filterFederalAgency.bind(this));
  }

  public setLanguages() {
    let languages = new Set();
    this.results.forEach(result => {
      if (Array.isArray(result.languages)) {
        result.languages.forEach(language => {
          if (allLanguages.indexOf(language) > -1) {
            languages.add(language);
          }
        });
      }
    });
    this.languages = Array.from(languages).sort();
  }

  public setFederalAgencies(initialAgencies = []) {
    const nameToAcronym = {};
    const names = new Set();
    this.results.forEach(repo => {
      const agency = repo.agency;
      nameToAcronym[agency.name] = agency.acronym;
      names.add(agency.name);
    });
    this.agencies = Array.from(names).sort().map(name => {
      const acronym = nameToAcronym[name];
      const checked = typeof initialAgencies === 'object' && initialAgencies.indexOf(acronym) > -1;
      return { name: name, value: acronym, checked: checked };
    });
  }

  public setLicenses() {
    let licenses = new Set();
    this.results.forEach(result => {
      if (result.permissions && result.permissions.licenses) {
        result.permissions.licenses.forEach(license => {
          if (license.name) {
            const licenseName = license.name;
            if (licenseNameToId.hasOwnProperty(licenseName)) {
              licenses.add(JSON.stringify({ name: licenseName, value: licenseNameToId[licenseName] }));
            } else if (licenseIdToName.hasOwnProperty(licenseName)) {
              licenses.add(JSON.stringify({ name: licenseIdToName[licenseName], value: licenseName }));
            }
          }
        });
      }
    });
    this.licenses = Array.from(licenses)
      .map(license => JSON.parse(license))
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  public setTypes() {
    let types = new Set();
    this.results.forEach(result => {
      if (result.type) {
        types.add(result.type);
      }
    });
    this.types = Array.from(types).sort();
  }

  public onFilterBoxChange(event) {
    this.filterResults();

    const target = event.target;
    if (target.tagName === 'INPUT') {
      const li = target.parentElement;
      const ul = li.parentElement;
      const container = ul.parentElement;
      const webComponent = container.parentElement;

      const category = webComponent.title;
      const checked = target.checked;
      const value = target.value;
      const name = li.querySelector('label').textContent;

      if (checked) {
        this.filterTags.push({ category, name, value });
      } else {
        this.filterTags = this.filterTags.filter(tag => {
          return tag.category !== category && tag.name !== name;
        });
      }
    }

    // set federal agency params
    // const names = this.getFilterBoxValues('Federal Agency');
    // let hash = window.location.hash.replace(/\?agencies=[^&]*/, '');
    // if (names.length === 0) {
    //  window.location.hash = hash;
    // } else {
    //  window.location.hash = hash + '?agencies=' + names.join(',');
    // }
  }

  /* on trigger by click on filter tag */
  public removeFilterTag(target) {
    this.filterTags = this.filterTags.filter(tag => tag !== target);
    const nativeElement = this.hostElement.nativeElement;
    const selector = `filter-box[title='${target.category}'] input[value='${target.value}']`;
    nativeElement.querySelector(selector).checked = false;
    this.filterResults();
  }

  public onSortSelectionChange() {
    this.sortResults();
  }

  public sortResults() {
    switch (this.selectedSortOption) {
      case 'A-Z':
        this.finalResults.sort((a, b) => a.name.trim() < b.name.trim() ? -1 : 1);
        break;
      case 'Best Match':
        this.finalResults.sort((a, b) => {
          if (a.searchScore < b.searchScore) {
            return 1;
          } else if (a.searchScore > b.searchScore) {
            return -1;
          } else {
            // sort by name
            return a.name.trim() < b.name.trim() ? -1 : 1;
          }
        });
        break;
      case 'Data Quality':
        this.finalResults.sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          } else if (a.score > b.score) {
            return -1;
          } else {
            // sort by name
            return a.name.trim() < b.name.trim() ? -1 : 1;
          }
        });
        break;
      case 'Last Updated':
        this.finalResults.sort((a, b) => {
          const aTime = a.date && a.date.lastModified ? new Date(a.date.lastModified).getTime() :  -10e10;
          const bTime = b.date && b.date.lastModified ? new Date(b.date.lastModified).getTime() :  -10e10;
          return Math.sign(bTime - aTime) || 0;
        });
        break;
      default:
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 750) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
      this.sideNavBarWidth = '0';
    }
  }

  onShowFilter() {
    this.sideNavBarWidth = '100%';
  }

  onCloseNavBar() {
    this.sideNavBarWidth = '0';

  }
}
