import {
  Http
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/single';
import * as lunr from 'lunr';

@Injectable()

export class ReleasesIndexService {
  releases: any;
  releasesReturned$: Observable<Array<any>>;
  private releasesSource = new BehaviorSubject<any[]>([]);
  private releasesIndex: any;
  private query: string = '';
  private loadResources: Subject<any> = new Subject();

  constructor(private http: Http) {
    this.releasesReturned$ = this.releasesSource.asObservable();

    this.releasesIndex = lunr(function () {});

    const getReleases = this.http.get(
      'assets/releases.json'
    )
    .map(response => response.json())
    .map(({ releases }) => this.releases = releases);

    const getReleasesIndex = this.http.get(
      'assets/releasesIndex.json'
    )
    .map(response => response.json())
    .map(releasesIndex => lunr.Index.load(releasesIndex))
    .map(loadedReleasesIndex => this.releasesIndex = loadedReleasesIndex);

    Observable.zip(
      getReleases,
      getReleasesIndex,
    )
    .single()
    .subscribe(() => {
      this.loadResources.complete();
    });
  }

  getRelease(id) {
    return this.releases[id];
  }

  search(query, source) {
    this.query = query;

    Observable.concat(
      this.loadResources,
      Observable.create(() => {
        source.next(this.releasesIndex.search(this.query));
      })
    )
    .single()
    .subscribe();
  }
}
