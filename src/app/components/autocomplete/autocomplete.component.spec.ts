import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AutocompleteComponent } from './autocomplete.component';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

const termResultsSource = new Subject<Array<any>>();

@Component({
  selector: 'test-component-wrapper',
  template: '<autocomplete [termResultsObservable]="termResultsObservable"></autocomplete>'
})
class AutocompleteComponentWrapper {
  termResultsObservable = termResultsSource.asObservable();
}

describe('AutocompleteComponent', () => {

  describe('component logic', () => {
    let fixture: ComponentFixture<AutocompleteComponentWrapper>;
    let component: AutocompleteComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [],
          declarations: [ AutocompleteComponentWrapper, AutocompleteComponent ],
          providers: [],
          schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        });
        fixture = TestBed.createComponent(AutocompleteComponentWrapper);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should have defined AutocompleteComponent instance', () => {
        expect(component).toBeDefined();
    });

    it('should have defined term results event subscription', () => {
        expect(component.subscription).toBeDefined();
    });

    it('should unsubscribe from router events when component is destroyed', () => {
        spyOn(component.subscription, 'unsubscribe');
        fixture.destroy();
        expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });

    describe('hasResults()', () => {
      it('should be false with no results', () => {
        termResultsSource.next([]);
        expect(component.hasResults()).toBe(false);
      });

      it('should be true with results', () => {
        termResultsSource.next([{}]);
        expect(component.hasResults()).toBe(true);
      });
    });

    it('should emit a suggestion when one is selected', () => {
      spyOn(component.onSuggestionSelected, 'emit');

      const suggestion = {};
      component.handleSuggestionSelected(suggestion);

      expect(component.onSuggestionSelected.emit).toHaveBeenCalledWith(suggestion);
    });
  });
});
