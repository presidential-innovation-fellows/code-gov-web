import { Component } from '@angular/core';

@Component({
  selector: 'home-header-navigation',
  styles: [
    require('./home-header-navigation.style.scss'),
    require('../../header-navigation/header-navigation.style.scss'),
  ],
  template: require('./home-header-navigation.template.html')
})

export class HomeHeaderNavigationComponent {

}
