import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { VerpackungFormComponent } from './verpackung-form/verpackung-form.component';
import { VerpackungListComponent } from './verpackung-list/verpackung-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { verpackungReducer } from './+state/verpackungs.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VerpackungsEffects } from './+state/verpackungs.effects';


const routes = [
  {
    path: 'list',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: VerpackungListComponent
  },
  {
    path: ':_id',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: VerpackungFormComponent
  },
  {
    path: '',
    canActivate: [() => {
      return of(!!localStorage.getItem('token'))
    }],
    component: VerpackungFormComponent
  },

]

@NgModule({
  declarations: [
    VerpackungFormComponent,
    VerpackungListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('verpackungs', verpackungReducer),
    EffectsModule.forFeature([VerpackungsEffects])
  ]
})
export class VerpackungModule { }
