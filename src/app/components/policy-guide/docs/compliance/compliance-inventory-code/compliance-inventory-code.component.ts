import { Component } from '@angular/core';
import { SeoService } from '../../../../../services/seo';

@Component({
  selector: 'inventory-code',
  templateUrl: './compliance-inventory-code.template.html'
})

export class ComplianceInventoryCodeComponent {
  constructor(private seoService: SeoService) {
    seoService.setTitle('Creating your enterprise code inventory', true);
    seoService.setMetaDescription('Learn how to create your enterprise code inventory and read up on the code.json metadata schema.');
    seoService.setMetaRobots('Index, Follow');
  }
}
