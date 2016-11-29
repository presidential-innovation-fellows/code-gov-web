import { Injectable } from '@angular/core';


function _window(): Window {
   // return the global native browser window object
   return window;
}

/**
 * A servioe that wraps the native global 'window' object
 * like $window in AngularJS 1.x. This allows for mocking
 * in unit tests.
 */
@Injectable()
export class WindowRef {
    constructor() {
    }

   get nativeWindow(): Window {
      return _window();
   }
}
