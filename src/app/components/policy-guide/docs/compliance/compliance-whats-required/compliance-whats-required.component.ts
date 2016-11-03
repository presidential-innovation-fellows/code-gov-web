import { Component } from '@angular/core';
import { SeoService } from '../../../../../services/seo';

@Component({
  selector: 'compliance-whats-required',
  template: require('./compliance-whats-required.template.html')
})

export class ComplianceWhatsRequiredComponent {
constructor(private seoService: SeoService) {
    seoService.setTitle('Policy Compliance - What\'s Required?', true);
    seoService.setMetaDescription('Learn about the requirements of the Federal Source Code Policy and when they have to be completed.');
    seoService.setMetaRobots('Index, Follow');
  }
}
