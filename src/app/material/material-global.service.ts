import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsState } from './+state/materials.reducer';
import { selectMaterials } from './+state/material.selectors';
import { MaterialsPageActions } from './+state/materials.actions';

@Injectable({
  providedIn: 'root'
})
export class MaterialGlobalService {

  constructor(private store: Store<MaterialsState>) {
    this.store.dispatch(MaterialsPageActions.loadMaterials())
   }

  materials$ = this.store.select(selectMaterials)
}
