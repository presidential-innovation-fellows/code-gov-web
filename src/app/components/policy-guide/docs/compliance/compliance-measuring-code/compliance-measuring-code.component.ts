import { Component } from '@angular/core';
import { SeoService } from '../../../../../services/seo';

@Component({
  selector: 'measuring-code',
  templateUrl: './compliance-measuring-code.template.html'
})

export class ComplianceMeasuringCodeComponent {
  constructor(private seoService: SeoService) {
    seoService.setTitle('Measuring Source Code', true);
    seoService.setMetaDescription('Learn about different ways to measure source code and how to choose the best method for your agency.');
    seoService.setMetaRobots('Index, Follow');
  }
}
