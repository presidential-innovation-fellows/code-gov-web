import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DefaultUrlSerializer, Router, RouterModule, UrlSerializer, UrlTree } from '@angular/router';
import { CustomUrlSerializer } from './custom-url-serializer';

@Component({
    selector: '',
    template: `<a routerLink='{{url}}'>test link</a>`
})
class TestRoutingWithFullUrlComponent {
    private url: string;

    setUrl(newUrl: string) {
      this.url = newUrl;
    }
}


/**
 * Unit tests for CustomUrlSerializer including tests for 3 things:
 * 1) CustomUrlSerializer.parse():
 * The parse function converts a relative url into a UrlTree.
 *
 * 2) CustomUrlSerializer.serialize():
 * The serialize function converts a UrlTree to a relative url string.
 *
 * 3) Usage of routerLink:
 * routerLink, when used in a template, sets an href attribute on an
 * a tag based on an expression between double curly braces
 */
describe('CustomUrlSerializer', () => {

  // The url serializer created for this app that correctly encodes parentheses
  let customUrlSerializer: CustomUrlSerializer;

  // The url serializer that comes with Angular 2 and doesn't encode parentheses
  let defaultUrlSerializer: DefaultUrlSerializer;

  beforeEach(() => {
      customUrlSerializer = new CustomUrlSerializer();
      defaultUrlSerializer = new DefaultUrlSerializer();
  });

  describe('parse', () => {

    describe('when a regular url without need for any special encoding/escaping is given', () => {
      it("the serializer's parsing method does not escape anything ", () => {

        let url: string = '/explore-code/agencies/DOJ';

        let expectedUrlSegments: Object[] = [
          {'path': 'explore-code', 'parameters': {}},
          {'path': 'agencies', 'parameters': {}},
          {'path': 'DOJ', 'parameters': {}}
        ];

        let actualUrlSegments = customUrlSerializer.parse(url).root.children.primary.segments;

        // Compare the value of the url segments, not whether they're techncially the same object in memory
        expect(JSON.stringify(actualUrlSegments)).toEqual(JSON.stringify(expectedUrlSegments));

      });
    });

    describe('when a url with escaped parentheses is used', () => {
      it('the serializer parsed and unescaped correctly', () => {

        let url: string = '/explore-code/agencies/DOJ/repos/Better%20View%20Pane%20Args%20%28Drupal%20module%29';

        let expected: Array<Object> = [
          {path: 'explore-code', parameters: {}},
          {path: 'agencies', parameters: {}},
          {path: 'DOJ', parameters: {}},
          {path: 'repos', parameters: {}},
          {path: 'Better View Pane Args (Drupal module)', parameters: {}}
        ];

        let actual = customUrlSerializer.parse(url).root.children.primary.segments;

        expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));

      });
    });

    describe('when a url with unescaped spaces and parentheses is used', () => {
      it('the serializer parsed correctly', () => {

        let url: string = '/explore-code/agencies/DOJ/repos/Better View Pane Args (Drupal module)';

        let expected: Array<Object> = [
          {path: 'explore-code', parameters: {}},
          {path: 'agencies', parameters: {}},
          {path: 'DOJ', parameters: {}},
          {path: 'repos', parameters: {}},
          {path: 'Better View Pane Args (Drupal module)', parameters: {}}
        ];

        let actual = customUrlSerializer.parse(url).root.children.primary.segments;

        expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));

      });
    });

  });

  describe('serialize', () => {
    describe('when a normal url tree without parentheses', () => {
      it('returns the correct url', () => {

        let originalUrl: string = '/explore-code/agencies/NASA';

        let urlTree: UrlTree = defaultUrlSerializer.parse(originalUrl);

        let actualUrl: string = customUrlSerializer.serialize(urlTree);

        /* we're basically checking if the customer url serializer
         * gives the same results as the default url serializer
         * when there are no parentheses present
         */
        expect(actualUrl).toEqual(originalUrl);

      });
    });

    describe('when a urlTree represnting a url with parenthese is given', () => {
      it('the Custom Url Serializer should correctly serialize with escaping', () => {

        let originalUrl: string = '/explore-code/agencies/NASA/' +
          'repos/Abaqus%20User%20Subroutine%20Verification%20%28abaverify%29';

        let urlTree: UrlTree = defaultUrlSerializer.parse(originalUrl);

        let actualUrl: string = customUrlSerializer.serialize(urlTree);

        /*
          We're basically checking to see if the serialize method correctly
          returns the reverse of the parse method.  We should note that we
          check if the parse method by itself is correct above.
        */
        expect(originalUrl).toEqual(actualUrl);

      });
    });

  });


  describe('Custom Url Serializer integrated in a template', () => {

      let fixture: ComponentFixture<TestRoutingWithFullUrlComponent>;
      let testComponent: TestRoutingWithFullUrlComponent;

      beforeEach(() => {
          TestBed.configureTestingModule({
              imports: [
                RouterModule.forRoot([], { useHash: true })
              ],
              declarations: [TestRoutingWithFullUrlComponent],
              providers: [
                { provide: APP_BASE_HREF, useValue: '/' },

                { provide: LocationStrategy, useClass: HashLocationStrategy },

                // CustomUrlSerializer replaces UrlSerializer like in app.module.ts
                { provide: UrlSerializer, useClass: CustomUrlSerializer }
              ],
          });
          fixture = TestBed.createComponent(TestRoutingWithFullUrlComponent);
          testComponent = fixture.componentInstance;
      });

      it('should set correct href when use unescaped url', () => {

          let originalUrl: string = '/explore-code/agencies/NASA/repos/Acoustic' +
            'Propagation and Emulation Toolset (APET)';

          testComponent.setUrl(originalUrl);

          fixture.detectChanges();

          let actualHref = fixture.nativeElement.querySelector('a').href;

          let expectedUrl = window.location.href + '#' +
            '/explore-code/agencies/NASA/repos/Acoustic%20Propagation%20and%20Emulation%20Toolset%20%28APET%29';

          expect(actualHref).toEqual(expectedUrl);
      });
  });

});
