import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getRouterSelectors } from "@ngrx/router-store";
import * as fromVerpackungs from './verpackungs.reducer'

export const selectVerpackungsState =
  createFeatureSelector<fromVerpackungs.VerpackungsState>('verpackungs');

export const selectVerpackungs = createSelector(
  selectVerpackungsState,
  fromVerpackungs.selectVerpackungs
);

export const selectBerechnungs = createSelector(
  selectVerpackungsState,
  (verpackungsState) => verpackungsState.berechnungs
);

export const selectVerpackungsEntities = createSelector(
  selectVerpackungsState,
  fromVerpackungs.selectVerpackungsEntities
);

export const selectVerpackungsErrorMessage = createSelector(
  selectVerpackungsState,
  (verpackungsState) => verpackungsState.errorMessage
);



export const { selectRouteParams } = getRouterSelectors();

export const selectVerpackungById = createSelector(
  selectVerpackungsEntities,
  selectRouteParams,
  (verpackungEntities, { _id }) => verpackungEntities[_id]
);

