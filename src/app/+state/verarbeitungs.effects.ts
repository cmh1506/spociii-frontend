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
import { VerarbeitungsAPIActions, VerarbeitungsPageActions } from './verarbeitungs.actions';
import { VerarbeitungService } from '../verarbeitung.service';

@Injectable()
export class VerarbeitungEffects {

  /* ngrxOnInitEffects() {
    //return VerarbeitungsPageActions.loadVerarbeitungs();
  } */
  

  loadVerarbeitungs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerarbeitungsPageActions.loadVerarbeitungs),
      exhaustMap(() =>
        this.verarbeitungService.getAll().pipe(
          tap(() => console.log("in verarbeitung effect")),
          map((verarbeitungs) =>
            VerarbeitungsAPIActions.verarbeitungsLoadedSuccess({ verarbeitungs })
          ),
          catchError((error) =>
            of(VerarbeitungsAPIActions.verarbeitungsLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  addVerarbeitung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerarbeitungsPageActions.addVerarbeitung),
      concatMap(({ verarbeitung }) =>
        this.verarbeitungService.add(verarbeitung).pipe(
          map((newVerarbeitung) =>
            VerarbeitungsAPIActions.verarbeitungAddedSuccess({ verarbeitung: newVerarbeitung })
          ),
          catchError((error) =>
            of(VerarbeitungsAPIActions.verarbeitungAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateVerarbeitung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerarbeitungsPageActions.updateVerarbeitung),
      concatMap(({ verarbeitung }) =>
        this.verarbeitungService.update(verarbeitung).pipe(
          map(() =>
            VerarbeitungsAPIActions.verarbeitungUpdatedSuccess({
              update: { id: verarbeitung._id, changes: verarbeitung },
            })
          ),
          catchError((error) =>
            of(VerarbeitungsAPIActions.verarbeitungUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteVerarbeitung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerarbeitungsPageActions.deleteVerarbeitung),
      mergeMap(({ id }) =>
        this.verarbeitungService
          .delete(id)
          .pipe(map(() => VerarbeitungsAPIActions.verarbeitungDeletedSuccess({ id })))
      ),
      catchError((error) =>
        of(VerarbeitungsAPIActions.verarbeitungDeletedFail({ message: error }))
      )
    )
  );

  redirectToVerarbeitungsPage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          VerarbeitungsAPIActions.verarbeitungAddedSuccess,
          VerarbeitungsAPIActions.verarbeitungUpdatedSuccess,
          VerarbeitungsAPIActions.verarbeitungDeletedSuccess
        ),
        tap(() => this.router.navigate(['/verarbeitungs']))
      ),
    { dispatch: false }
  );

  constructor(
    private verarbeitungService: VerarbeitungService,
    private actions$: Actions,
    private router: Router
  ) {}
}
