import { Routes, RouterModule } from '@angular/router';
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
  ComplianceDashboardComponent,
  ComplianceWhatsRequiredComponent,
  ComplianceProcurementComponent,
  DocsComponent,
  IntroductionComponent,
  OverviewComponent,
  OverviewInventoryComponent,
  OverviewPilotComponent,
  OverviewTrackingProgressComponent,
  PolicyComponent,
  PolicyIntroductionComponent,
  PolicyObjectivesComponent,
  PolicyScopeComponent,
  PolicySolutionsAnalysisComponent,
  PolicyCodeReuseComponent,
  PolicyOpenSourceComponent,
  PolicyExceptionsComponent, 
  PolicyImplementationComponent,
  PolicyAppendixComponent,
  PolicyGuideComponent
  OpenSourceLicensingComponent
} from '../../utils/app-components';
import { DataResolver } from '../../app.resolver';


export const POLICY_GUIDE_ROUTES: Routes = [
  {
    path: 'policy-guide',
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
              { path: '', redirectTo: 'dashboard'},
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
                path: 'whats-required',
                redirectTo: 'dashboard'
              },
              {
                path: 'dashboard',
                component: ComplianceDashboardComponent
              },
              {
                path: 'procurement',
                component: ComplianceProcurementComponent
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
              { path: 'measuring-code', component: ComplianceMeasuringCodeComponent },
              { path: 'licensing', component: OpenSourceLicensingComponent },
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
     },
     {
        path: 'policy',
        component: PolicyComponent,
        children: [
          { path: '', redirectTo: 'introduction'},
          { path: 'introduction', component: PolicyIntroductionComponent },
          { path: 'objectives', component: PolicyObjectivesComponent },
          { path: 'scope', component: PolicyScopeComponent },
          { path: 'solutions-analysis', component: PolicySolutionsAnalysisComponent },
          { path: 'code-reuse', component: PolicyCodeReuseComponent },
          { path: 'open-source', component: PolicyOpenSourceComponent },
          { path: 'exceptions', component: PolicyExceptionsComponent },
          { path: 'implementation', component: PolicyImplementationComponent },
          { path: 'appendix', component: PolicyAppendixComponent },
        ]
     }
    ]
  }
];
