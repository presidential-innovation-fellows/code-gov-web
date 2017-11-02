import {
  Headers,
  RequestOptions,
  RequestOptionsArgs,
  Response
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { AgenciesIndexService, ReleasesIndexService } from '../indexes';
import { SearchService } from './search.service';

@Injectable()

export class LunrSearchService implements SearchService {
  searchResultsReturned$: Observable<Array<any>>;
  total = 0;

  private searchObservable = new Observable();
  private results = [];
  private loadedResults = [];
  private currentIndex = 0;
  private pageSize = 20;
  private searchResultsReturnedSource = new BehaviorSubject<Array<any>>(null);
  private previousQuery = '';
  private agenciesSource: Subject<any> = new Subject();
  private releasesSource: Subject<any> = new Subject();
  private agenciesSubscription: Subscription;
  private releasesSubscription: Subscription;
  private agenciesResults = [];
  private releasesResults = [];

  constructor(
    private agenciesIndexService: AgenciesIndexService,
    private releasesIndexService: ReleasesIndexService,
  ) {
    this.searchResultsReturned$ = this.searchResultsReturnedSource.asObservable();

    const releasesReturned = this.releasesSource.map((results) => {
      return results
        .map(result => ({ score: result.score, item: this.releasesIndexService.getRelease(result.ref) }));
    });

    const agenciesReturned = this.agenciesSource.map((results) => {
      return results
        .map(result => ({ score: result.score * 1.5, item: this.agenciesIndexService.getAgency(result.ref) }));
    });

    this.releasesSubscription = Observable.zip(
      releasesReturned,
      agenciesReturned,
      function (releasesResults, agenciesResults) {
        return [...agenciesResults, ...releasesResults]
          .sort((a, b) => a.score > b.score ? -1 : a.score === b.score ? 0 : 1)
          .map(result => result.item);
      },
    ).subscribe((searchResults) => {
      this.currentIndex = 0;
      this.results = searchResults;

      this.total = this.results.length;
      this.loadedResults = this.results
        .slice(this.currentIndex, this.currentIndex + this.pageSize);
      this.currentIndex = this.currentIndex + this.pageSize;
      this.searchResultsReturnedSource.next(this.loadedResults);
    });
  }

  ngOnDestroy() {
    this.releasesSubscription.unsubscribe();
    this.agenciesSubscription.unsubscribe();
  }

  search(query: string) {
    this.releasesIndexService.search(query, this.releasesSource);
    this.agenciesIndexService.search(query, this.agenciesSource);
  }

  nextPage() {
    if (this.currentIndex <= this.total) {
      this.loadedResults = this.loadedResults.concat(
        this.results
          .slice(this.currentIndex, this.currentIndex + this.pageSize));
      this.currentIndex = this.currentIndex + this.pageSize;
      this.searchResultsReturnedSource.next(this.loadedResults);
    }
  }
}
