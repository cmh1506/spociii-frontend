import { createAction, createReducer, on } from "@ngrx/store";
import { VerpackungsAPIActions, VerpackungsPageActions } from "./verpackungs.actions";
import { Verpackung } from "src/app/models/verpackung";

export interface VerpackungState {
  verpackungs: Verpackung[],
  selectedVerpackung: Verpackung | null,
  errorMessage: string
}
const initialState: VerpackungState = {
  verpackungs: [],
  selectedVerpackung: null,
  errorMessage: ''
}

export const verpackungReducer = createReducer(
  initialState,
  on(VerpackungsAPIActions.verpackungsLoadedSuccess, (state, { verpackungs }) => ({
    ...state,
    verpackungs,
    errorMessage: ''
  })),
  on(VerpackungsAPIActions.verpackungsLoadedFailure, (state, { message }) => ({
    ...state,
    verpackungs: [],
    errorMessage: message
  })),
  on(VerpackungsAPIActions.selectedVerpackungLoadedSuccess, (state, { selectedVerpackung }) => ({
    ...state,
    selectedVerpackung,
    errorMessage: ''
  })),
  on(VerpackungsAPIActions.selectedVerpackungLoadedFailure, (state, { message }) => ({
    ...state,
    selectedVerpackung: null,
    errorMessage: message
  }))
)