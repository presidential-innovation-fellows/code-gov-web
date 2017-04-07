import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AgencyService, Agency } from '../../../services/agency';
import { ReposService } from '../../../services/repos';
import { LanguageIconPipe } from '../../../pipes/language-icon';
import { PluralizePipe } from '../../../pipes/pluralize';
import { SeoService } from '../../../services/seo';
import { TruncatePipe } from '../../../pipes/truncate';

@Component({
  selector: 'agency',
  styleUrls: ['./agency.styles.scss'],
  templateUrl: './agency.template.html'
})

export class AgencyComponent implements OnInit, OnDestroy {
  agency: Agency;
  public hasRepos: boolean = false;
  public repos;
  private eventSub: Subscription;
  private agencyReposSub: Subscription;

  constructor(
    private agencyService: AgencyService,
    private route: ActivatedRoute,
    private reposService: ReposService,
    private seoService: SeoService
  ) {}

  ngOnDestroy() {
    this.hasRepos = false;
    this.agency = null;
    if (this.eventSub) this.eventSub.unsubscribe();
    if (this.agencyReposSub) this.agencyReposSub.unsubscribe();
  }

  ngOnInit() {
    this.eventSub = this.route.params.subscribe(params => {

      let id = params['id'];

      this.agency = this.agencyService.getAgency(id);
      this.agencyRepos();

      this.seoService.setTitle(this.agency.name, true);
      this.seoService.setMetaDescription('Browse code from the ' + this.agency.name);
      this.seoService.setMetaRobots('Index, Follow');
    });
  }

  agencyId() {
    return this.agency.id;
  }

  agencyRepos() {
    this.agencyReposSub = this.reposService.getJsonFile().
      subscribe((result) => {
        if (result) {
          this.repos = result['repos'].filter(repo => this.filterByAgency(repo));
          this.hasRepos = this.checkRepos(this.repos);
        } else {
          console.log('Error.');
        }
    });
  }

  checkRepos(repos) {
    if (repos.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  filterByAgency(repo) {
    if (repo.agency !== undefined && repo.agency === this.agencyId()) {
      return true;
    } else {
      return false;
    }
  }
}
