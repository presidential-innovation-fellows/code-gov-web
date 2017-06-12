import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo';

@Component({
  selector: 'policy-open-source',
  template: require('./policy-open-source.template.html')
})
export class PolicyOpenSourceComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Source Code Policy Open Source Software', true);
    seoService.setMetaDescription('Read the Federal Open Source Code Policy Open Source Software.');
    seoService.setMetaRobots('Index, Follow');
  }
}
