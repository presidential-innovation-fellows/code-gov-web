import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo';

@Component({
  selector: 'policy-solutions-analysis',
  template: require('./policy-solutions-analysis.template.html')
})
export class PolicySolutionsAnalysisComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Source Code Policy Three-Step Software Solutions Analysis', true);
    seoService.setMetaDescription(
      'Read the Federal Open Source Code Policy Three-Step Software Solutions Analysis.'
    );
    seoService.setMetaRobots('Index, Follow');
  }
}
