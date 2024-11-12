import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserState =
  createFeatureSelector<UserState>('user')

export const selectUserToken = createSelector(
  selectUserState,
  ({ token }) => token?.token
)

export const selectUserErrorMessage = createSelector(
  selectUserState,
  ({ errorMessage }) => errorMessage
)

export const selectUserAuthenticated = createSelector(
  selectUserState,
  ({ authenticated }) => authenticated
)