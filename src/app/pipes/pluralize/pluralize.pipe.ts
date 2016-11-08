import * as pluralize from 'pluralize';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})

export class PluralizePipe implements PipeTransform {
  transform(value: string, arg: number): any {

    return pluralize.plural(value);
  }
}
