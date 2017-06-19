import { Component } from '@angular/core';
import { SeoService } from '../../../../../services/seo';

@Component({
  selector: 'open-source-licensing',
  template: require('./open-source-licensing.template.html')
})

export class OpenSourceLicensingComponent {
  constructor(private seoService: SeoService) {
    seoService.setTitle('Open Source Licensing', true);
    seoService.setMetaDescription('Learn about open source licensing under the Source Code Policy.');
    seoService.setMetaRobots('Index, Follow');
  }
}
