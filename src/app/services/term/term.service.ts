import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export abstract class TermService {
  abstract search(query: string, source: Subject<Array<any>>): void;
}
