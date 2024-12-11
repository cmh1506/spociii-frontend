import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnergierueckgewinnungs from './energierueckgewinnungs.reducer';

export const selectEnergierueckgewinnungsState =
  createFeatureSelector<fromEnergierueckgewinnungs.EnergierueckgewinnungsState>('energierueckgewinnungs');

export const selectEnergierueckgewinnungs = createSelector(
  selectEnergierueckgewinnungsState,
  fromEnergierueckgewinnungs.selectEnergierueckgewinnungs
);

export const selectEnergierueckgewinnungsEntities = createSelector(
  selectEnergierueckgewinnungsState,
  fromEnergierueckgewinnungs.selectEnergierueckgewinnungsEntities
);

export const { selectRouteParams } = getRouterSelectors();

export const selectEnergierueckgewinnungById = createSelector(
  selectEnergierueckgewinnungsEntities,
  selectRouteParams,
  (energierueckgewinnungEntities, { _id }) => energierueckgewinnungEntities[_id]
);
