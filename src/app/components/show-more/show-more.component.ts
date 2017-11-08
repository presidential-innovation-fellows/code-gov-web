import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Class representing a search results page for repositories.
 */

@Component({
  selector: 'show-more',
  template: require('./show-more.template.html'),
})

export class ShowMoreComponent {
  @Input() list = [];
  @Input() name = '';
  @Input() maxShown = 4;
  @Input() formGroup: FormGroup;
  isShowMoreClicked = false;

  public showAll(e) {
    e.preventDefault();
    this.maxShown = undefined;
  }

  public isShowAllVisible() {
    return this.maxShown !== undefined && this.maxShown < this.list.length;
  }
}
