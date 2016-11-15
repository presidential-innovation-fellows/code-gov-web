import { Injectable } from '@angular/core';


function _window(): Window {
   // return the global native browser window object
   return window;
}

@Injectable()
export class WindowRef {
    constructor() {
    }

   get nativeWindow(): Window {
      return _window();
   }
}
