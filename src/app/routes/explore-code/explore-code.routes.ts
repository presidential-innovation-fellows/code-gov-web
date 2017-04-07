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
      { path: '', redirectTo: 'agencies/' + AGENCIES[0].id, pathMatch: 'full' },
      { path: 'agencies',
        component: AgenciesComponent,
        children: [
          { path: '', redirectTo: AGENCIES[0].id, pathMatch: 'full' },
          { path: ':id', component: AgencyComponent }
        ]
      },
      {
        path: 'repos',
        component: ReposComponent,
        children: [
          { path: ':id', component: RepoComponent }
        ]
      }
    ]
  }
];
