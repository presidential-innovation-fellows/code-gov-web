
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()

export class RepoService {
  private repo: Object;

  constructor(private http: Http) {}

  getRepo(id: string): Observable<Response> {
    let repoUrl = API_URL + 'repo/' + id;

    return this.http.get(repoUrl).map((res: Response) => res.json());
  }
}
