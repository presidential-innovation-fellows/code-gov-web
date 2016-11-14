"use strict";
var app_components_1 = require('./utils/app-components');
var explore_code_1 = require('./routes/explore-code');
var policy_guide_1 = require('./routes/policy-guide');
exports.ROUTES = [
    { path: '', component: app_components_1.HomeComponent }
].concat(explore_code_1.EXPLORE_CODE_ROUTES, policy_guide_1.POLICY_GUIDE_ROUTES, [
    { path: 'privacy-policy', component: app_components_1.PrivacyPolicyComponent },
    { path: '**', component: app_components_1.FourOhFourComponent }
]);
//# sourceMappingURL=app.routes.js.map