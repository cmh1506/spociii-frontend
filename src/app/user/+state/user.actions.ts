import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginInfo, Token, User } from "src/app/models/user";

export const UserPageActions = createActionGroup({
  source: 'User Page',
  events: {
    'Register User': props<{user: User}>(),
    'Login User': props<{info: LoginInfo}>(),
    'Logout User': emptyProps,
  }
})

export const UserAPIActions = createActionGroup({
  source: 'User API',
  events: {
    'User Registration Success': props<{token: Token}>(),
    'User Registration Failure': props<{message: string}>(),
    'User Login Success': props<{token: Token}>(),
    'User Login Failure': props<{message: string}>(),
  }
})