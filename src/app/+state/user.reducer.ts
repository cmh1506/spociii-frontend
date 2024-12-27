import { createReducer, on } from "@ngrx/store"
import { UserAPIActions, UserPageActions } from "./user.actions"
import { Token } from "../models/user"
import { Role } from "../models/role"

export interface UserState {
  token: Token | null
  errorMessage: string
  authenticated: boolean
  admin: boolean
}
const initialState: UserState = {
  token: null,
  errorMessage: '',
  authenticated: false,
  admin: false
}

export const userReducer = createReducer(
  initialState,
  on(UserAPIActions.userRegistrationSuccess, (state: UserState, {token}) => ({
    ...state,
    token: token,
    errorMessage: '',
    authenticated: true,
    admin: (token.role.toString() === 'Admin')
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
    authenticated: true,
    admin: (token.role.toString() === 'Admin')
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
    authenticated: false,
    admin: false
  })),
)