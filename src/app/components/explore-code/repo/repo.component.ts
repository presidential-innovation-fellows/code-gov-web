import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AgencyService, Agency } from '../../../services/agency';
import { ExternalLinkDirective } from '../../../directives/external-link';
import { ReposService } from '../../../services/repos';
import { SeoService } from '../../../services/seo';

@Component({
  selector: 'repo',
  styleUrls: ['./repo.styles.scss'],
  templateUrl: './repo.template.html'
})

export class RepoComponent implements OnInit, OnDestroy {
  agency: Agency;
  repo: any;
  eventSub: Subscription;
  repoSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private agencyService: AgencyService,
    private reposService: ReposService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.eventSub = this.route.params.subscribe(params => {

      let id = params['id'];

      this.getRepo(id);
    });
  }

  ngOnDestroy() {
    if (this.eventSub) this.eventSub.unsubscribe();
    if (this.repoSub) this.repoSub.unsubscribe();
  }

  getRepo(id) {
    this.repoSub = this.reposService.getJsonFile().
      subscribe((result) => {
        if (result) {
          this.repo = result['repos'].filter(repo => repo.repoID === id)[0];
          this.repo.agency = this.agencyService.getAgency(this.repo.agency);
          this.seoService.setTitle(this.repo.name, true);
          this.seoService.setMetaDescription(this.repo.description);
          this.seoService.setMetaRobots('Index, Follow');
        } else {
          console.log('Error. Source code repositories not found');
        }
    });
  }
}
