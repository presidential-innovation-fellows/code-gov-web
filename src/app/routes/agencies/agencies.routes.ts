import { Routes, RouterModule } from '@angular/router';
import {
  AgenciesComponent,
  AgencyComponent,
  AgencyListComponent
} from '../../utils/app-components';


export const AGENCY_ROUTES: Routes = [
  {
    path: 'agencies',
    component: AgenciesComponent,
    children: [
      { path: '', component: AgencyListComponent },
      { path: ':id', component: AgencyComponent }
    ]
  }
];
