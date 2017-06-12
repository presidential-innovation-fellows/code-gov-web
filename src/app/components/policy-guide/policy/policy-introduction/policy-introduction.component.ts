import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo';

@Component({
  selector: 'policy-introduction',
  template: require('./policy-introduction.template.html')
})
export class PolicyIntroductionComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Source Code Policy Introduction', true);
    seoService.setMetaDescription('Start here to read the Federal Open Source Code Policy.');
    seoService.setMetaRobots('Index, Follow');
  }
}
