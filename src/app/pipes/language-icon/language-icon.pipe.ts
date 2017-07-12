import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGES } from './';

@Pipe({
  name: 'languageIcon'
})

export class LanguageIconPipe implements PipeTransform {

  parameterize(value: string): any {
    let lowercasedValue = value.toLowerCase();
    return lowercasedValue.replace(/ /g, '_');
  }

  transform(value: string): any {
    let sanitizedValue = this.parameterize(value);

    switch (sanitizedValue) {
      case 'html':
        sanitizedValue = 'html5';
        break;
      case 'css':
        sanitizedValue = 'css3';
        break;
      default:
        break;
    }

    if (LANGUAGES.indexOf(sanitizedValue) > -1) {
      return sanitizedValue;
    } else {
      return 'code_badge';
    }
  }
}
