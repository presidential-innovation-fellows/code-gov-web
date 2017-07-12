import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo';

@Component({
  selector: 'policy-implementation',
  template: require('./policy-implementation.template.html')
})
export class PolicyImplementationComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Source Code Policy Implementation', true);
    seoService.setMetaDescription('Read the Federal Open Source Code Policy Implementation.');
    seoService.setMetaRobots('Index, Follow');
  }
}
