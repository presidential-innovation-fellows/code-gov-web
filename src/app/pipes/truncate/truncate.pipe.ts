import { Pipe, PipeTransform, Component } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {
  transform(value: string, arg?: string): any {
    /*
      This check follows the same behavior as Angular 2 standard
      pipes that handle strings such as UppercasePipe.
      Note that a returned null value gets converted to an
      empty string in the template where this pipe is used, which prevents
      problems if this pipe is chained with others. See truncate.pipe.spec.ts
      for tests that illustrate this behavior.
    */
    if (value == null) {
      return null;
    }
    let limit = parseInt(arg, 10) || 10;
    let trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
