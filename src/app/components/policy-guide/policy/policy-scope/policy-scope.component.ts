import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo';

@Component({
  selector: 'policy-scope',
  template: require('./policy-scope.template.html')
})
export class PolicyScopeComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Source Code Policy Scope and Applicability', true);
    seoService.setMetaDescription(
      'Read the Federal Open Source Code Policy Scope and Applicability.'
    );
    seoService.setMetaRobots('Index, Follow');
  }
}
