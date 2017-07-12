import { Component } from '@angular/core';

import * as Pluralize from 'pluralize';
import { PluralizePipe } from './pluralize.pipe';

/**
 * Unit tests for IsDefinedPipe including tests for
 * IsDefinedPipe.transform() and tests where the pipe
 * is integrated into a template.
 */
describe('PluralizePipe', () => {
  let pipe: PluralizePipe;

  beforeEach(() => {
      pipe = new PluralizePipe();
  });

  describe('transform', () => {
    const pluralize: any = Pluralize;
    const value = 'Value';

    it('calls Pluralize', () => {
      expect(pipe.transform(value, 1)).toEqual(pluralize(value, 1));
    });

    describe('when a number greater than 1 is passed as an argument', () => {
      it('returns a plural value', () => {
        expect(pipe.transform(value, 2)).toEqual('Values');
      });
    });

    describe('when a number less than 2 is passed as an argument', () => {
      it('returns a singular value', () => {
        expect(pipe.transform(value, 1)).toEqual(value);
      });
    });
  });
});
