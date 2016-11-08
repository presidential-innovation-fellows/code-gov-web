import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from '../../components/modal'
import { AppPipesModule } from '../../pipes';

import {
  CapacityComponent,
  CapacityBasicsComponent,
  CapacityCollaborationComponent,
  CapacityInteragencySharingComponent,
  CapacityIntroductionComponent,
  CapacityResourcesComponent,
  CapacitySecurityComponent,
  ComplianceComponent,
  ComplianceAcquiringCodeComponent,
  ComplianceInventoryCodeComponent,
  ComplianceLicensingComponent,
  ComplianceMeasuringCodeComponent,
  ComplianceMetadataSchemaComponent,
  ComplianceWhatsRequiredComponent,
  DocsComponent,
  IntroductionComponent,
  OverviewComponent,
  OverviewInventoryComponent,
  OverviewPilotComponent,
  OverviewTrackingProgressComponent,
  PolicyGuideComponent
} from '../../components/policy-guide';
import { DataResolver } from '../../app.resolver';


export const POLICY_GUIDE_ROUTES: Routes = [
  {
    path: '',
    component: PolicyGuideComponent,
    children: [
      { path: '', redirectTo: 'docs/overview/introduction'},
      {
        path: 'docs',
        component: DocsComponent,
        children: [
          { path: '', redirectTo: 'overview/introduction'},
          {
            path: 'compliance',
            component: ComplianceComponent,
            children: [
              { path: '', redirectTo: 'whats-required'},
              {
                path: 'acquiring-code',
                component: ComplianceAcquiringCodeComponent
              },
              {
                path: 'inventory-code',
                component: ComplianceInventoryCodeComponent
              },
              {
                path: 'licensing',
                component: ComplianceLicensingComponent
              },
              {
                path: 'measuring-code',
                component: ComplianceMeasuringCodeComponent
              },
              {
                path: 'metadata-schema',
                component: ComplianceMetadataSchemaComponent
              },
              {
                path: 'whats-required',
                component: ComplianceWhatsRequiredComponent
              }
            ]
          },
          {
            path: 'open-source',
            component: CapacityComponent,
            children: [
              { path: '', redirectTo: 'introduction' },
              { path: 'basics', component: CapacityBasicsComponent },
              {
                path: 'collaboration',
                component: CapacityCollaborationComponent
              },
              {
                path: 'interagency-sharing',
                component: CapacityInteragencySharingComponent
              },
              {
                path: 'introduction',
                component: CapacityIntroductionComponent
              },
              { path: 'resources', component: CapacityResourcesComponent },
              { path: 'security', component: CapacitySecurityComponent }
            ]
          },
          {
            path: 'overview',
            component: OverviewComponent,
            children: [
              { path: '', redirectTo: 'introduction'},
              { path: 'introduction', component: IntroductionComponent },
              { path: 'inventory', component: OverviewInventoryComponent },
              { path: 'pilot', component: OverviewPilotComponent },
              {
                path: 'tracking-progress',
                component: OverviewTrackingProgressComponent
              }
            ]
          }
        ]
     }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    AppPipesModule,
    RouterModule.forChild(POLICY_GUIDE_ROUTES)
  ],
  declarations: [
    CapacityComponent,
    CapacityBasicsComponent,
    CapacityCollaborationComponent,
    CapacityInteragencySharingComponent,
    CapacityIntroductionComponent,
    CapacityResourcesComponent,
    CapacitySecurityComponent,
    ComplianceComponent,
    ComplianceAcquiringCodeComponent,
    ComplianceInventoryCodeComponent,
    ComplianceLicensingComponent,
    ComplianceMeasuringCodeComponent,
    ComplianceMetadataSchemaComponent,
    ComplianceWhatsRequiredComponent,
    DocsComponent,
    IntroductionComponent,
    OverviewComponent,
    OverviewInventoryComponent,
    OverviewPilotComponent,
    OverviewTrackingProgressComponent,
    PolicyGuideComponent
  ]
})
export class PolicyGuideModule {}
