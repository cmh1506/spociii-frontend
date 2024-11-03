import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from './material-list/material-list.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { materialsReducer } from './+state/materials.reducer';
import { MaterialEffects } from './+state/materials.effects';



@NgModule({
  declarations: [
    MaterialListComponent
  ],
  imports: [
    CommonModule,
    //RouterModule.forChild(routes),
    StoreModule.forFeature('materials', materialsReducer),
    EffectsModule.forFeature([MaterialEffects])
  ]
})
export class MaterialModule { }
