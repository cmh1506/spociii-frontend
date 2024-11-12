import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserAPIActions, UserPageActions } from "./user.actions";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { MaterialsState } from "src/app/+state/materials.reducer";
import { Store } from "@ngrx/store";
import { MaterialsPageActions } from "src/app/+state/materials.actions";
import { UserService } from "../user.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private materialStore: Store<MaterialsState>
  ){}

  registerUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserPageActions.registerUser),
      concatMap(({user}) => 
        this.userService.registerUser(user).pipe(
          map((token) =>
            UserAPIActions.userRegistrationSuccess({token})
          ),
          catchError((error) => 
            of(UserAPIActions.userRegistrationFailure({message: error}))
          )
        )
      )
    )
  )

  loginUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserPageActions.loginUser),
      concatMap(({info}) => 
        this.userService.loginUser(info).pipe(
          map((token) =>
            UserAPIActions.userLoginSuccess({token: token})
          ),
          catchError((error) => 
            of(UserAPIActions.userLoginFailure({message: error}))
          )
        )
      )
    )
  )

  redirectToVerpackungsList = createEffect(
    () =>
    this.actions$.pipe(
      ofType(
        UserAPIActions.userLoginSuccess,
        UserAPIActions.userRegistrationSuccess
      ),
      tap(() => this.materialStore.dispatch(MaterialsPageActions.loadMaterials())),
      tap(() => this.router.navigate(['/verpackung/list']))
    ),
    { dispatch: false }
  )  

}




