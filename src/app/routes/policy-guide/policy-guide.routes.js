"use strict";
var app_components_1 = require('../../utils/app-components');
exports.POLICY_GUIDE_ROUTES = [
    {
        path: 'policy-guide',
        component: app_components_1.PolicyGuideComponent,
        children: [
            { path: '', redirectTo: 'docs/overview/introduction' },
            {
                path: 'docs',
                component: app_components_1.DocsComponent,
                children: [
                    { path: '', redirectTo: 'overview/introduction' },
                    {
                        path: 'compliance',
                        component: app_components_1.ComplianceComponent,
                        children: [
                            { path: '', redirectTo: 'whats-required' },
                            {
                                path: 'acquiring-code',
                                component: app_components_1.ComplianceAcquiringCodeComponent
                            },
                            {
                                path: 'inventory-code',
                                component: app_components_1.ComplianceInventoryCodeComponent
                            },
                            {
                                path: 'licensing',
                                component: app_components_1.ComplianceLicensingComponent
                            },
                            {
                                path: 'measuring-code',
                                component: app_components_1.ComplianceMeasuringCodeComponent
                            },
                            {
                                path: 'metadata-schema',
                                component: app_components_1.ComplianceMetadataSchemaComponent
                            },
                            {
                                path: 'whats-required',
                                component: app_components_1.ComplianceWhatsRequiredComponent
                            }
                        ]
                    },
                    {
                        path: 'open-source',
                        component: app_components_1.CapacityComponent,
                        children: [
                            { path: '', redirectTo: 'introduction' },
                            { path: 'basics', component: app_components_1.CapacityBasicsComponent },
                            {
                                path: 'collaboration',
                                component: app_components_1.CapacityCollaborationComponent
                            },
                            {
                                path: 'interagency-sharing',
                                component: app_components_1.CapacityInteragencySharingComponent
                            },
                            {
                                path: 'introduction',
                                component: app_components_1.CapacityIntroductionComponent
                            },
                            { path: 'resources', component: app_components_1.CapacityResourcesComponent },
                            { path: 'security', component: app_components_1.CapacitySecurityComponent }
                        ]
                    },
                    {
                        path: 'overview',
                        component: app_components_1.OverviewComponent,
                        children: [
                            { path: '', redirectTo: 'introduction' },
                            { path: 'introduction', component: app_components_1.IntroductionComponent },
                            { path: 'inventory', component: app_components_1.OverviewInventoryComponent },
                            { path: 'pilot', component: app_components_1.OverviewPilotComponent },
                            {
                                path: 'tracking-progress',
                                component: app_components_1.OverviewTrackingProgressComponent
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
//# sourceMappingURL=policy-guide.routes.js.map