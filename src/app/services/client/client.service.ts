import { Injectable } from '@angular/core';
import { CodeGovAPIClient } from '@code.gov/api-client';
import { BehaviorSubject } from 'rxjs/';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class ClientService extends CodeGovAPIClient {

  constructor() {

    super({
      base: 'https://code-api-staging.app.cloud.gov/api/0.1/',
      debug: true,
      environment: 'development'
    });

  }

  search(term: string, limit: number): Observable<Array<any>> {
    return Observable.fromPromise(super.search(term, limit));
  }

}
