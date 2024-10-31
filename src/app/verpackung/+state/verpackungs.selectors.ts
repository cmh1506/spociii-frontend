import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VerpackungState } from "./verpackungs.reducer";

export const selectVerpackungsState = createFeatureSelector<VerpackungState>('verpackungs')

export const selectVerpackungs = createSelector(
  selectVerpackungsState,
  (verpackungState) => verpackungState.verpackungs
)

export const selectSelectedVerpackung = createSelector(
  selectVerpackungsState,
  (verpackungState) => verpackungState.selectedVerpackung
)

export const selectVerpackungsErrorMessage = createSelector(
  selectVerpackungsState,
  (verpackungState) => verpackungState.errorMessage
)

