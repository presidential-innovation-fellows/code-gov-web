import * as Pluralize from 'pluralize';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})

export class PluralizePipe implements PipeTransform {
  transform(value: string, arg: number): any {
    const pluralize: any = Pluralize;

    return pluralize(value, arg);
  }
}
