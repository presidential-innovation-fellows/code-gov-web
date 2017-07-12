import { Component } from '@angular/core';
import { SeoService } from '../../../../../services/seo';

@Component({
  selector: 'compliance-procurement',
  template: require('./compliance-procurement.template.html')
})

export class ComplianceProcurementComponent {
  constructor(private seoService: SeoService) {
    seoService.setTitle('Procuring Software', true);
    seoService.setMetaDescription('Learn about different ways to procure software.');
    seoService.setMetaRobots('Index, Follow');
  }
}
