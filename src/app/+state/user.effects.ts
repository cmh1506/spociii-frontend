import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserAPIActions, UserPageActions } from "./user.actions";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { UserService } from "../user.service";
import { MaterialsState } from "./materials.reducer";
import { MaterialsPageActions } from "./materials.actions";
import { VerarbeitungsState } from "./verarbeitungs.reducer";
import { VerarbeitungsPageActions } from "./verarbeitungs.actions";
import { EnergierueckgewinnungsState } from "./energierueckgewinnungs.reducer";
import { EnergierueckgewinnungsPageActions } from "./energierueckgewinnungs.actions";
import { TransportmittelsState } from "./transportmittels.reducer";
import { TransportmittelsPageActions } from "./transportmittels.actions";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private materialStore: Store<MaterialsState>,
    private verarbeitungStore: Store<VerarbeitungsState>,
    private energierueckgewinnungsStore: Store<EnergierueckgewinnungsState>,
    private transportmittelsStore: Store<TransportmittelsState>
  ){}

  registerUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserPageActions.registerUser),
      concatMap(({user}) => 
        this.userService.registerUser(user).pipe(
          map((token) =>
            UserAPIActions.userRegistrationSuccess({token: token})
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

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserPageActions.loadUsers),
      concatMap(() =>
        this.userService.getAll().pipe(
          map((users) =>
            UserAPIActions.usersLoadedSuccess({ users })
          ),
          catchError((error) =>
            of(UserAPIActions.usersLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserPageActions.updateUser),
      concatMap(({ user }) =>
        this.userService.update(user).pipe(
          map(() => UserAPIActions.userUpdatedSuccess({ user })),
          catchError((error) =>
            of(UserAPIActions.userUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  redirectToVerpackungsList = createEffect(
    () =>
    this.actions$.pipe(
      ofType(
        UserAPIActions.userLoginSuccess,
        UserAPIActions.userRegistrationSuccess        
      ),
      tap(() => {
        this.materialStore.dispatch(MaterialsPageActions.loadMaterials())
        this.verarbeitungStore.dispatch(VerarbeitungsPageActions.loadVerarbeitungs())
        this.energierueckgewinnungsStore.dispatch(EnergierueckgewinnungsPageActions.loadEnergierueckgewinnungs())
        this.transportmittelsStore.dispatch(TransportmittelsPageActions.loadTransportmittels())
        console.log("Load Verabeitungs fired")
      }),
      tap(() => this.router.navigate(['/verpackung/list']))
    ),
    { dispatch: false }
  )  

  redirectToUserList = createEffect(
    () =>
    this.actions$.pipe(
      ofType(
        UserAPIActions.userUpdatedSuccess       
      ),      
      tap(() => this.router.navigate(['/user-list']))
    ),
    { dispatch: false }
  )

}




