import { createAction, createReducer, on } from "@ngrx/store";
import { VerpackungsAPIActions, VerpackungsPageActions } from "./verpackungs.actions";
import { Verpackung } from "src/app/models/verpackung";

export interface VerpackungState {
  verpackungs: Verpackung[],
  errorMessage: string
}
const initialState: VerpackungState = {
  verpackungs: [],
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
  }))
)