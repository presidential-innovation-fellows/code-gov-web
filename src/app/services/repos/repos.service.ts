import {
  Http,
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class ReposService {
  reposReturned$: Observable<any>;
  private reposSource = new BehaviorSubject<any>({
    releases: null
  });

  constructor(private http: Http) {
    this.reposReturned$ = this.reposSource.asObservable();

    this.http.get(
      'assets/releases.json'
    )
    .map(response => response.json())
    .subscribe((repos) => this.reposSource.next(repos));
  }

  getJsonFile(): Observable<any> {
    return this.reposReturned$;
  }
}
