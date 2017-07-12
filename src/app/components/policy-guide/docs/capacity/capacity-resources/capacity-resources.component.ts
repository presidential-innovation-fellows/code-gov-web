import { Component } from '@angular/core';
import { SeoService } from '../../../../../services/seo';

@Component({
  selector: 'resources',
  template: require('./capacity-resources.template.html')
})

export class CapacityResourcesComponent {
constructor(private seoService: SeoService) {
    seoService.setTitle('Tools and Resources', true);
    seoService.setMetaDescription(
      'A growing list of tools and resources that agencies can use to share and ' +
      'open source their code.'
    );
    seoService.setMetaRobots('Index, Follow');
  }
}
