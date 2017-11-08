import { Observable } from 'rxjs/Observable';

export abstract class SearchService {
  total: number;
  searchResultsReturned$: Observable<any>;

  abstract search(query: string): void;
}
