import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { authGuard } from '../auth.guard';
import { SharedModule } from '../shared/shared.module';
import { MaterialFormComponent } from './material-form.component';
import { adminGuard } from '../admin.guard';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MaterialListComponent } from './material-list.component';

const routes = [
  {
    path: '',
    canActivate: [adminGuard],
    component: MaterialListComponent
  },
  {
    path: ':_id',
    canActivate: [adminGuard],
    component: MaterialFormComponent
  },
  {
    path: 'add',
    canActivate: [adminGuard],
    component: MaterialFormComponent
  },

]

@NgModule({
  declarations: [
    MaterialFormComponent,
    MaterialListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class MaterialModule { }
