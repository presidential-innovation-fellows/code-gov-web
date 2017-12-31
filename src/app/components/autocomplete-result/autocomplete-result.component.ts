import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'autocomplete-result',
  styles: [require('./autocomplete-result.style.scss')],
  template: require('./autocomplete-result.template.html')
})

export class AutocompleteResultComponent {
  @Input() result;
  @Output() onSuggestionSelected = new EventEmitter();
  resource: any = {};

  ngOnInit() {
    if (this.result.agency) { // it's a repo with an agency attribute
      this.resource['iconId'] = 'assets/img/logos/agencies/' + this.result.agency  + '-50x50.png';
      this.resource['imageIcon'] = true;
      this.resource['url'] = `/explore-code/agencies/${this.result.agency}/repos/${this.result.name}`;
      this.resource['name'] = this.result.name;
    } else { // it's an agency
      this.resource['iconId'] = 'assets/img/logos/agencies/' + this.result.id  + '-50x50.png';
      this.resource['imageIcon'] = true;
      this.resource['url'] = '/explore-code/agencies/' + this.result.id;
      this.resource['name'] = this.result.name;
    }
  }

  handleSuggestionSelected() {
    this.onSuggestionSelected.emit(this.result);
  }
}
