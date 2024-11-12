import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from './material-list/material-list.component';
import { authGuard } from '../auth.guard';
import { MaterialFormComponent } from './material-form/material-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes = [
  {
    path: 'list',
    canActivate: [authGuard],
    component: MaterialListComponent
  },
  {
    path: ':_id',
    canActivate: [authGuard],
    component: MaterialFormComponent
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MaterialFormComponent
  },

]


@NgModule({
  declarations: [
    MaterialListComponent,
    MaterialFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class MaterialModule { }
