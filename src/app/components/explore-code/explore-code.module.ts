import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from '../../components/modal'
import { AppPipesModule } from '../../pipes';

import {
  AgenciesComponent,
  AgencySidebarComponent,
  AgencyComponent,
  ExploreCodeComponent,
  RepoComponent,
  ReposComponent,
  ActivityListComponent
} from '../../components/explore-code/index';

import { AGENCIES } from '../../services/agency';
import { DataResolver } from '../../app.resolver';

export const EXPLORE_CODE_ROUTES: Routes = [
  {
    path: '',
    component: ExploreCodeComponent,
    children: [
      { path: '', redirectTo: 'agencies/' + AGENCIES[0].id },
      { path: 'agencies',
        component: AgenciesComponent,
        children: [
          { path: '', redirectTo: AGENCIES[0].id },
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

@NgModule({
  imports: [
    ModalModule,
    CommonModule,
    AppPipesModule,
    RouterModule.forChild(EXPLORE_CODE_ROUTES)
  ],
  declarations: [
    AgencySidebarComponent,
    AgenciesComponent,
    AgencyComponent,
    ExploreCodeComponent,
    RepoComponent,
    ReposComponent,
    ActivityListComponent
  ],
  exports: [AgencySidebarComponent,
    AgenciesComponent,
    AgencyComponent,
    ExploreCodeComponent,
    RepoComponent,
    ReposComponent,
    ActivityListComponent]
})
export class ExploreCodeModule {}
