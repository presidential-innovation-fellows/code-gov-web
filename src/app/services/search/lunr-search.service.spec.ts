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

import { LunrSearchService } from './lunr-search.service';

describe('LunrSearchService', () => {
  let service: LunrSearchService;
  let backend: XHRBackend;
  let defaultOptions: BaseRequestOptions;
  const http = new Http(backend, defaultOptions);

  describe('search', () => {
    it('calls search on the Lunr index');
  });
});
