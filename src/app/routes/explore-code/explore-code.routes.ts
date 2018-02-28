import { Routes, RouterModule } from '@angular/router';
import {
  AgenciesComponent,
  AgencyComponent,
  ExploreCodeComponent,
  RepoComponent,
  ReposComponent
} from '../../utils/app-components';
import { AGENCIES } from '../../services/agency';
import { DataResolver } from '../../app.resolver';


export const EXPLORE_CODE_ROUTES: Routes = [
  {
    path: 'explore-code',
    component: ExploreCodeComponent,
    children: [
      { path: '', redirectTo: 'agencies/NASA', pathMatch: 'full' },
      { path: 'agencies',
        component: AgenciesComponent,
        children: [
          { path: '', redirectTo: '/NASA', pathMatch: 'full' },
          { path: ':id', component: AgencyComponent }
        ]
      },
      {
        path: 'agencies/:agency_id/repos',
        component: ReposComponent,
      },
      {
        path: 'agencies/:agency_id/repos/:id',
        component: RepoComponent,
      },
    ]
  }
];
