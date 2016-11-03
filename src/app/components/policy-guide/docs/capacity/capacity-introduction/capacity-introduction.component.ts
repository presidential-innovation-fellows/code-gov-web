import { Component } from '@angular/core';
import { SeoService } from '../../../../../services/seo';

@Component({
  selector: 'introduction',
  template: require('./capacity-introduction.template.html')
})

export class CapacityIntroductionComponent {
  constructor(private seoService: SeoService) {
    seoService.setTitle('Introduction - Building your Agency\'s Open Source Practice', true);
    seoService.setMetaDescription('Recommendations for an interdisciplinary approach to Open Source for Federal agencies.');
    seoService.setMetaRobots('Index, Follow');
  }
}
