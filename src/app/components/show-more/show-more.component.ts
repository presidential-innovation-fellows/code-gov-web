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
  @Input() numShown = null;
  @Input() threshold = 4;
  @Input() mode = 'collapsed';
  @Input() formGroup: FormGroup;
  isShowMoreClicked = false;


  public showAll(e) {
    e.preventDefault();
    this.mode = 'expanded';
  }

  public showLess(e) {
    e.preventDefault();
    this.mode = 'collapsed';
  }

  public getNumberToShow() {
    if (this.mode === 'collapsed') {
      return Math.min(this.threshold || this.list.length);
    } else if (this.mode === 'expanded') {
      console.log('getNumberToShow returning:', this.list.length);
      return this.list.length;
    }
  }

  public isShowLessVisible() {
    return this.mode === 'expanded';
  }

  public isShowAllVisible() {
    return this.mode === 'collapsed' &&
      this.list &&
      this.list.length &&
      this.list.length > 0 &&
      this.list.length > this.threshold;
  }
}
