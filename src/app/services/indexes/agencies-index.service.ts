import {
  Http
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip';
import * as lunr from 'lunr';

@Injectable()

export class AgenciesIndexService {
  agenciesReturned$: Observable<Array<any>>;
  private agencies: any;
  private agenciesSource = new BehaviorSubject<any[]>([]);
  private agenciesIndex: any;
  private query: string = '';

  constructor(private http: Http) {
    this.agenciesReturned$ = this.agenciesSource.asObservable();

    this.agenciesIndex = lunr(function () {});

    this.http.get(
      'assets/agencies.json'
    )
    .map(response => response.json())
    .map(({ agencies }) => this.agencies = agencies)
    .map(agencies => lunr(function () {
      this.ref('id');
      this.field('id');
      this.field('name');

      Object.values(agencies).forEach(agency => this.add(agency));
    }))
    .map(agenciesIndex => this.agenciesIndex = agenciesIndex)
    .subscribe(() => {
      // this.agenciesSource.next(this.agenciesIndex.search(this.query));
    });
  }

  getAgency(id) {
    return this.agencies[id];
  }

  search(query, source) {
    this.query = query;

    source.next(this.agenciesIndex.search(this.query));
  }
}
