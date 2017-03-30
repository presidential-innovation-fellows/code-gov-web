import { Component } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { AgencyService } from '../../services/agency';

@Component({
  selector: 'agencies',
  template: require('./agency-list.template.html')
})

export class AgencyListComponent {
  public hasAgencies: boolean = false;
  private agencies: Object[];
  private agenciesSub: Subscription;

  constructor(
    private agencyService: AgencyService,
  ) {}

  newAgenciesQuery(): Observable<any> {
    return this.agencyService.getAgencies();
  }

  newAgenciesSubscription(): Subscription {
    return this.newAgenciesQuery().subscribe(
      (response: any) => {
        if (response['agencies'].length > 0) {
          this.agencies = response['agencies'];
          this.hasAgencies = true;
        }
      }
    );
  }

  ngOnInit() {
    this.agenciesSub = this.newAgenciesSubscription();
  }
}
