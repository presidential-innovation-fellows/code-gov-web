import { Component, Input } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { RepoComponent } from '../repo';
import { TruncatePipe } from '../../../pipes/truncate';
import { Agency, AgencyService } from '../../services/agency';

/**
 * Class representing a component for repositories in a list view.
 */

@Component({
  selector: 'repo-list-item',
  styles: [require('./repo-list-item.styles.scss')],
  template: require('./repo-list-item.template.html')
})

export class RepoListItemComponent {
  @Input() repo;
  agency: Agency;

  /**
   * Constructs a RepoListItemComponent.
   *
   * @constructor
   */
  constructor(private agencyService: AgencyService) {}

  ngOnInit() {
    this.agency = this.agencyService.getAgency(this.repo.agency);
  }

  getAgencyIcon() {
    return `assets/img/logos/agencies/${this.agency.id}-50x50.png`;
  }

  /**
   * Returns whether the provided repository is from GitHub.
   */
  isGitHubRepo() {
    if (!this.repo.repositoryURL && typeof this.repo.repositoryURL !== 'string') {
      return false;
    } else {
      const isGitHubURL = /github\.com/;

      return isGitHubURL.test(this.repo.repositoryURL);
    }
  }
}
