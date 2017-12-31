import {
  Http,
  Headers,
  RequestOptions,
  RequestOptionsArgs,
  Response
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { SearchService } from './search.service';

@Injectable()

export class ElasticsearchSearchService implements SearchService {
  searchResultsReturned$: Observable<Array<any>>;
  total = 0;
  private API_URL = 'http://localhost:3001/api/0.1/';
  private searchResultsReturnedSource = new BehaviorSubject<Array<any>>([]);
  private repositories = [];
  private currentIndex = 0;
  private pageSize = 20;
  private query = '';

  constructor(private http: Http) {
    this.searchResultsReturned$ = this.searchResultsReturnedSource.asObservable();
  }

  search(query: string): Observable<Array<any>> {
    this.query = query;

    let queryParams = `?_fulltext=${this.query}&from=${this.currentIndex}&size=${this.pageSize}`;
    let queryUrl = this.API_URL + 'repos' + queryParams;

    this.currentIndex = this.currentIndex + this.pageSize;

    const request = this.http.get(queryUrl).map(
      (res: Response) => {
        const results = res.json();
        this.total = results.total;
        this.repositories = results.repos;

        return this.repositories;
      }
    );

    request.subscribe(repositories => this.searchResultsReturnedSource.next(repositories));

    return request;
  }

  nextPage() {
    let queryParams = `?_fulltext=${this.query}&from=${this.currentIndex}&size=${this.pageSize}`;
    let queryUrl = this.API_URL + 'repos' + queryParams;

    this.currentIndex = this.currentIndex + this.pageSize;

    const request = this.http.get(queryUrl).map(
      (res: Response) => {
        const results = res.json();
        this.total = results.total;
        this.repositories = this.repositories.concat(results.repos);

        return this.repositories;
      }
    );

    request.subscribe(repositories => this.searchResultsReturnedSource.next(repositories));

    return request;
  }
}
