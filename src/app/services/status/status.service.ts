import {
  Http,
  Headers,
  RequestOptions,
  RequestOptionsArgs,
  Response
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class StatusService {
  constructor(private http: Http) {}

  getJsonFile(): Observable<Response> {
    return this.http.get(
      'assets/report.json'
    )
    .map(response => response.json());
  }
}
