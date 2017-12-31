import {
  Http,
  Headers,
  BaseRequestOptions,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  XHRBackend
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AgenciesIndexService } from './agencies-index.service';

describe('AgenciesIndexService', () => {
  let service: AgenciesIndexService;
  let backend: XHRBackend;
  let defaultOptions: BaseRequestOptions = new BaseRequestOptions();
  const http = new Http(backend, defaultOptions);

  beforeEach(() => {
    spyOn(http, 'get').and.returnValue(
      Observable.of({
        json() {
          return {
            agencies: []
          };
        }
      }));

    service = new AgenciesIndexService(http);
  });

  describe('search', () => {
    it('makes a request to the API', () => {
      const source = new Subject<any>();

      service.search('GSA', source);

      expect(http.get).toHaveBeenCalledWith('assets/agencies.json');
    });
  });
});
