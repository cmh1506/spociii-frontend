import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { authGuard } from '../auth.guard';
import { SharedModule } from '../shared/shared.module';
import { VerpackungsEffects } from './+state/verpackungs.effects';
import { verpackungReducer } from './+state/verpackungs.reducer';
import { VerpackungFormComponent } from './verpackung-form/verpackung-form.component';
import { VerpackungListComponent } from './verpackung-list/verpackung-list.component';


const routes = [
  {
    path: 'list',
    canActivate: [authGuard],
    component: VerpackungListComponent
  },
  {
    path: ':_id',
    canActivate: [authGuard],
    component: VerpackungFormComponent
  },
  {
    path: '',
    canActivate: [authGuard],
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
