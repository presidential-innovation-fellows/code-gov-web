import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo';

@Component({
  selector: 'policy-code-reuse',
  template: require('./policy-code-reuse.template.html')
})
export class PolicyCodeReuseComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Source Code Policy Government-Wide Code Reuse', true);
    seoService.setMetaDescription(
      'Read the Federal Open Source Code Policy Government-Wide Code Reuse.'
    );
    seoService.setMetaRobots('Index, Follow');
  }
}
