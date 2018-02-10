import { Pipe, PipeTransform, Component } from '@angular/core';
const capitalize = require('lodash/capitalize');

@Pipe({
  name: 'capitalize'
})

export class CapitalizePipe implements PipeTransform {
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

    return capitalize(value);
  }
}
