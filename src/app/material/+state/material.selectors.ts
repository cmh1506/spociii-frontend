import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterials from './materials.reducer';

export const selectMaterialsState =
  createFeatureSelector<fromMaterials.MaterialsState>('materials');

export const selectMaterials = createSelector(
  selectMaterialsState,
  fromMaterials.selectMaterials
);

export const selectMaterialsEntities = createSelector(
  selectMaterialsState,
  fromMaterials.selectMaterialsEntities
);

export const { selectRouteParams } = getRouterSelectors();

export const selectMaterialById = createSelector(
  selectMaterialsEntities,
  selectRouteParams,
  (materialEntities, { _id }) => materialEntities[_id]
);
