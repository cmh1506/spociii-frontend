import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransportmittels from './transportmittels.reducer';

export const selectTransportmittelsState =
  createFeatureSelector<fromTransportmittels.TransportmittelsState>('transportmittels');

export const selectTransportmittels = createSelector(
  selectTransportmittelsState,
  fromTransportmittels.selectTransportmittels
);

export const selectTransportmittelsEntities = createSelector(
  selectTransportmittelsState,
  fromTransportmittels.selectTransportmittelsEntities
);

export const { selectRouteParams } = getRouterSelectors();

export const selectTransportmittelById = createSelector(
  selectTransportmittelsEntities,
  selectRouteParams,
  (transportmittelEntities, { _id }) => transportmittelEntities[_id]
);
