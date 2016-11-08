import { Component } from '@angular/core';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'banner-art',  // <home></home>
  styleUrls: ['./banner-art.style.scss'],
  templateUrl: './banner-art.template.html'
})
export class BannerArtComponent {

  constructor() {}
}
