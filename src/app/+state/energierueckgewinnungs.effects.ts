import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { EnergierueckgewinnungsAPIActions, EnergierueckgewinnungsPageActions } from './energierueckgewinnungs.actions';
import { EnergierueckgewinnungService } from '../energierueckgewinnung.service';

@Injectable()
export class EnergierueckgewinnungEffects {

  /* ngrxOnInitEffects() {
    //return EnergierueckgewinnungsPageActions.loadEnergierueckgewinnungs();
  } */
  

  loadEnergierueckgewinnungs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnergierueckgewinnungsPageActions.loadEnergierueckgewinnungs),
      exhaustMap(() =>
        this.energierueckgewinnungService.getAll().pipe(
          tap(() => console.log("in energierueckgewinnung effect")),
          map((energierueckgewinnungs) =>
            EnergierueckgewinnungsAPIActions.energierueckgewinnungsLoadedSuccess({ energierueckgewinnungs })
          ),
          catchError((error) =>
            of(EnergierueckgewinnungsAPIActions.energierueckgewinnungsLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  addEnergierueckgewinnung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnergierueckgewinnungsPageActions.addEnergierueckgewinnung),
      concatMap(({ energierueckgewinnung }) =>
        this.energierueckgewinnungService.add(energierueckgewinnung).pipe(
          map((newEnergierueckgewinnung) =>
            EnergierueckgewinnungsAPIActions.energierueckgewinnungAddedSuccess({ energierueckgewinnung: newEnergierueckgewinnung })
          ),
          catchError((error) =>
            of(EnergierueckgewinnungsAPIActions.energierueckgewinnungAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateEnergierueckgewinnung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnergierueckgewinnungsPageActions.updateEnergierueckgewinnung),
      concatMap(({ energierueckgewinnung }) =>
        this.energierueckgewinnungService.update(energierueckgewinnung).pipe(
          map(() =>
            EnergierueckgewinnungsAPIActions.energierueckgewinnungUpdatedSuccess({
              update: { id: energierueckgewinnung._id, changes: energierueckgewinnung },
            })
          ),
          catchError((error) =>
            of(EnergierueckgewinnungsAPIActions.energierueckgewinnungUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteEnergierueckgewinnung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnergierueckgewinnungsPageActions.deleteEnergierueckgewinnung),
      mergeMap(({ id }) =>
        this.energierueckgewinnungService
          .delete(id)
          .pipe(map(() => EnergierueckgewinnungsAPIActions.energierueckgewinnungDeletedSuccess({ id })))
      ),
      catchError((error) =>
        of(EnergierueckgewinnungsAPIActions.energierueckgewinnungDeletedFail({ message: error }))
      )
    )
  );

  redirectToEnergierueckgewinnungsPage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          EnergierueckgewinnungsAPIActions.energierueckgewinnungAddedSuccess,
          EnergierueckgewinnungsAPIActions.energierueckgewinnungUpdatedSuccess,
          EnergierueckgewinnungsAPIActions.energierueckgewinnungDeletedSuccess
        ),
        tap(() => this.router.navigate(['/energierueckgewinnungs']))
      ),
    { dispatch: false }
  );

  constructor(
    private energierueckgewinnungService: EnergierueckgewinnungService,
    private actions$: Actions,
    private router: Router
  ) {}
}
