import { createReducer, on } from "@ngrx/store"
import { UserAPIActions, UserPageActions } from "./user.actions"
import { Token } from "../models/user"

export interface UserState {
  token: Token | null
  errorMessage: string
  authenticated: boolean
}
const initialState: UserState = {
  token: null,
  errorMessage: '',
  authenticated: false
}

export const userReducer = createReducer(
  initialState,
  on(UserAPIActions.userRegistrationSuccess, (state: UserState, {token}) => ({
    ...state,
    token: token,
    errorMessage: '',
    authenticated: true
  })),
  on(UserAPIActions.userRegistrationFailure, (state: UserState, {message}) => ({
    ...state,
    token: null,
    errorMessage: message,
    authenticated: false
  })),
  on(UserAPIActions.userLoginSuccess, (state: UserState, {token}) => ({
    ...state,
    token: token,
    errorMessage: '',
    authenticated: true
  })),
  on(UserAPIActions.userLoginFailure, (state: UserState, {message}) => ({
    ...state,
    token: null,
    errorMessage: message,
    authenticated: false
  })),
  on(UserPageActions.logoutUser, (state: UserState) => ({
    ...state,
    token: null,
    errorMessage: '',
    authenticated: false
  })),
)