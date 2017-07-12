import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo';

@Component({
  selector: 'policy-exceptions',
  template: require('./policy-exceptions.template.html')
})
export class PolicyExceptionsComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Source Code Policy Exceptions to Government Code Reuse', true);
    seoService.setMetaDescription(
      'Read the Federal Open Source Code Policy Exceptions to Government Code Reuse.'
    );
    seoService.setMetaRobots('Index, Follow');
  }
}
