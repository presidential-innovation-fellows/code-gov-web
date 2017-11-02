import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/single';

import { AgenciesIndexService, ReleasesIndexService } from '../indexes';
import { TermService } from './term.service';

@Injectable()

export class LunrTermService implements TermService {
  private repositoriesIndex: any;
  private agenciesIndex: any;
  private agenciesByRef: Object = {};
  private termResultsReturnedSource = new BehaviorSubject<Array<any>>([]);
  private agenciesSource: Subject<any> = new Subject();
  private releasesSource: Subject<any> = new Subject();
  private searchResults: Observable<any>;
  private releasesSubscription: Subscription;
  private agenciesResults = [];
  private releasesResults = [];

  termResultsReturned$;

  constructor(
    private agenciesIndexService: AgenciesIndexService,
    private releasesIndexService: ReleasesIndexService,
  ) {
    const agenciesByRef = this.agenciesByRef;

    this.termResultsReturned$ = this.termResultsReturnedSource.asObservable();

    const releasesReturned = this.releasesSource.map((results) => {
      return results
        .map(result => ({ score: result.score, item: this.releasesIndexService.getRelease(result.ref) }));
    });

    const agenciesReturned = this.agenciesSource.map((results) => {
      return results
        .map(result => ({ score: result.score * 1.5, item: this.agenciesIndexService.getAgency(result.ref) }));
    });

    this.searchResults = Observable.zip(
      releasesReturned,
      agenciesReturned,
      function (releasesResults, agenciesResults) {
        return [...agenciesResults, ...releasesResults]
          .sort((a, b) => a.score > b.score ? -1 : a.score === b.score ? 0 : 1)
          .map(result => result.item);
      },
    );
  }

  ngOnDestroy() {
  }

  search(query, responseSource) {
    const queryWithWildcards = query.trim().split(' ').map(word => `${word}* ${word}`).join(' ');

    this.searchResults.first().subscribe((searchResults) => {
      responseSource.next(
        searchResults
          .slice(0, 6));
    });
    this.releasesIndexService.search(queryWithWildcards, this.releasesSource);
    this.agenciesIndexService.search(queryWithWildcards, this.agenciesSource);
  }
}
