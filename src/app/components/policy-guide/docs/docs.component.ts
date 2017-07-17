import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'docs',
  styles: [require('./docs.style.scss')],
  template: require('./docs.template.html'),
  encapsulation: ViewEncapsulation.None
})
export class DocsComponent {

}
