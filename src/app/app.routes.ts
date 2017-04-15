import { Routes, RouterModule } from '@angular/router';
import {
   FourOhFourComponent,
   HomeComponent,
   PrivacyPolicyComponent
 } from './utils/app-components';
import { EXPLORE_CODE_ROUTES } from './routes/explore-code';
import { POLICY_GUIDE_ROUTES } from './routes/policy-guide';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  ...EXPLORE_CODE_ROUTES,
  ...POLICY_GUIDE_ROUTES,
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', component: FourOhFourComponent }
];
