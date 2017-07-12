import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo';

@Component({
  selector: 'policy-objectives',
  template: require('./policy-objectives.template.html')
})
export class PolicyObjectivesComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Source Code Policy Objectives', true);
    seoService.setMetaDescription('Read the Federal Open Source Code Policy Objectives.');
    seoService.setMetaRobots('Index, Follow');
  }
}
