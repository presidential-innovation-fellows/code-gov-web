import { Routes, RouterModule } from '@angular/router';
import {
   FourOhFourComponent,
   HomeComponent,
   PrivacyPolicyComponent
 } from './utils/app-components';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explore-code', loadChildren: 'src/app/components/explore-code/explore-code.module#ExploreCodeModule'},
  { path: 'policy-guide', loadChildren: 'src/app/components/policy-guide/policy-guide.module#PolicyGuideModule'},
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', component: FourOhFourComponent }
];
