import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVerarbeitungs from '../+state/verarbeitungs.reducer';

export const selectVerarbeitungsState =
  createFeatureSelector<fromVerarbeitungs.VerarbeitungsState>('verarbeitungs');

export const selectVerarbeitungs = createSelector(
  selectVerarbeitungsState,
  fromVerarbeitungs.selectVerarbeitungs
);

export const selectVerarbeitungsEntities = createSelector(
  selectVerarbeitungsState,
  fromVerarbeitungs.selectVerarbeitungsEntities
);

export const { selectRouteParams } = getRouterSelectors();

export const selectVerarbeitungById = createSelector(
  selectVerarbeitungsEntities,
  selectRouteParams,
  (verarbeitungEntities, { _id }) => verarbeitungEntities[_id]
);
