import { Component } from '@angular/core';
import { SeoService } from '../../../../../services/seo';

@Component({
  selector: 'introduction',
  template: require('./introduction.template.html')
})
export class IntroductionComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Policy Implementation Introduction', true);
    seoService.setMetaDescription(
      'Start here for an overview of the Federal Open Source Code Policy.'
    );
    seoService.setMetaRobots('Index, Follow');
  }
}
