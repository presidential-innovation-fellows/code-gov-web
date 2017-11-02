import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from '../api';
import { AgencyService } from '../agency';

import { TermService } from './term.service';

@Injectable()

export class ElasticsearchTermService extends ApiService implements TermService {
  constructor(
    private http: Http,
    private agencyService: AgencyService,
  ) {
    super(http);
  }

  search(query, source) {
    super.fetch('terms', 'term=' + query + '&size=6&term_type=agency.acronym&term_type=agency.name')
      .subscribe(response => {
        source.next(
          response.terms
            .map(term => this.agencyService.getByName(term.term))
        );
      });
  }
}
