import { Component } from '@angular/core';
import { SeoService } from '../../../../services/seo';

@Component({
  selector: 'policy-appendix',
  template: require('./policy-appendix.template.html')
})
export class PolicyAppendixComponent {

  constructor(private seoService: SeoService) {
    seoService.setTitle('Source Code Policy Appendix A - Definitions', true);
    seoService.setMetaDescription('Read the Federal Open Source Code Policy Appendix A - Definitions.');
    seoService.setMetaRobots('Index, Follow');
  }
}
