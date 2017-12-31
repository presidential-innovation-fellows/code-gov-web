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

import { ElasticsearchSearchService } from './elasticsearch-search.service';

describe('ElasticsearchSearchService', () => {
  let service: ElasticsearchSearchService;
  let backend: XHRBackend;
  let defaultOptions: BaseRequestOptions;
  const http = new Http(backend, defaultOptions);

  beforeEach(() => { service = new ElasticsearchSearchService(http); });

  describe('search', () => {
    it('makes a request to the API', () => {
      let query = '_fulltext=GSA';
      let from = 0;
      let size = 20;
      let queryParams = query + '&from=' + from + '&size=' + size;
      let queryUrl = API_URL + 'repos?' + queryParams;

      spyOn(http, 'get').and.returnValue(
        Observable.of({
          json() {
            return {
              total: 0,
              repositories: [],
            };
          }
        }));
      service.search('GSA');

      expect(http.get).toHaveBeenCalledWith(queryUrl);
    });
  });
});
