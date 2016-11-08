import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgencyService, Agency } from '../../../services/agency';
import { ExternalLinkDirective } from '../../../directives/external-link';
import { ReposService } from '../../../services/repos';
import { SeoService } from '../../../services/seo';

@Component({
  selector: 'repo',
  styles: [require('./repo.styles.scss')],
  template: require('./repo.template.html')
})

export class RepoComponent {
  agency: Agency;
  repo: any;

  constructor(
    private route: ActivatedRoute,
    private agencyService: AgencyService,
    private reposService: ReposService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {

      let id = params['id'];

      this.getRepo(id);
    });
  }

  getRepo(id) {
    this.reposService.getJsonFile().
      subscribe((result) => {
        if (result) {
          this.repo = result['repos'].filter(repo => repo.repoID === id)[0];
          this.repo.agency = this.agencyService.getAgency(this.repo.agency);
          this.seoService.setTitle(this.repo.name, true);
          this.seoService.setMetaDescription(this.repo.description);
          this.seoService.setMetaRobots('Index, Follow');
        } else {
          console.log('Error.');
        }
    });
  }
}
