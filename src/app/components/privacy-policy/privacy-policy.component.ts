import { Component } from '@angular/core';
import { StateService } from '../../services/state';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'privacy-policy',
  styleUrls: ['./privacy-policy.style.scss'],
  templateUrl: './privacy-policy.template.html'
})

export class PrivacyPolicyComponent {

  constructor(
    private seoService: SeoService,
    public stateService: StateService
  ) {
    this.stateService.set('section', 'privacy-policy');
    this.seoService.setTitle('Privacy Policy', true);
    this.seoService.setMetaDescription('Learn about how Code.gov is using cookies and analytics.');
    this.seoService.setMetaRobots('Index, Follow');
  }
}
