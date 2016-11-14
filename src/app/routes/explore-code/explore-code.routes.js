"use strict";
var app_components_1 = require('../../utils/app-components');
var agency_1 = require('../../services/agency');
exports.EXPLORE_CODE_ROUTES = [
    {
        path: 'explore-code',
        component: app_components_1.ExploreCodeComponent,
        children: [
            { path: '', redirectTo: 'agencies/' + agency_1.AGENCIES[0].id },
            { path: 'agencies',
                component: app_components_1.AgenciesComponent,
                children: [
                    { path: '', redirectTo: agency_1.AGENCIES[0].id },
                    { path: ':id', component: app_components_1.AgencyComponent }
                ]
            },
            {
                path: 'repos',
                component: app_components_1.ReposComponent,
                children: [
                    { path: ':id', component: app_components_1.RepoComponent }
                ]
            }
        ]
    }
];
//# sourceMappingURL=explore-code.routes.js.map