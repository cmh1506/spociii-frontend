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
import { TransportmittelsAPIActions, TransportmittelsPageActions } from './transportmittels.actions';
import { TransportmittelService } from '../transportmittel.service';

@Injectable()
export class TransportmittelEffects {

  /* ngrxOnInitEffects() {
    //return TransportmittelsPageActions.loadTransportmittels();
  } */
  

  loadTransportmittels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransportmittelsPageActions.loadTransportmittels),
      exhaustMap(() =>
        this.transportmittelService.getAll().pipe(
          tap(() => console.log("in transportmittel effect")),
          map((transportmittels) =>
            TransportmittelsAPIActions.transportmittelsLoadedSuccess({ transportmittels })
          ),
          catchError((error) =>
            of(TransportmittelsAPIActions.transportmittelsLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  addTransportmittel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransportmittelsPageActions.addTransportmittel),
      concatMap(({ transportmittel }) =>
        this.transportmittelService.add(transportmittel).pipe(
          map((newTransportmittel) =>
            TransportmittelsAPIActions.transportmittelAddedSuccess({ transportmittel: newTransportmittel })
          ),
          catchError((error) =>
            of(TransportmittelsAPIActions.transportmittelAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateTransportmittel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransportmittelsPageActions.updateTransportmittel),
      concatMap(({ transportmittel }) =>
        this.transportmittelService.update(transportmittel).pipe(
          map(() =>
            TransportmittelsAPIActions.transportmittelUpdatedSuccess({
              update: { id: transportmittel._id, changes: transportmittel },
            })
          ),
          catchError((error) =>
            of(TransportmittelsAPIActions.transportmittelUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteTransportmittel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransportmittelsPageActions.deleteTransportmittel),
      mergeMap(({ id }) =>
        this.transportmittelService
          .delete(id)
          .pipe(map(() => TransportmittelsAPIActions.transportmittelDeletedSuccess({ id })))
      ),
      catchError((error) =>
        of(TransportmittelsAPIActions.transportmittelDeletedFail({ message: error }))
      )
    )
  );

  redirectToTransportmittelsPage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TransportmittelsAPIActions.transportmittelAddedSuccess,
          TransportmittelsAPIActions.transportmittelUpdatedSuccess,
          TransportmittelsAPIActions.transportmittelDeletedSuccess
        ),
        tap(() => this.router.navigate(['/transportmittels']))
      ),
    { dispatch: false }
  );

  constructor(
    private transportmittelService: TransportmittelService,
    private actions$: Actions,
    private router: Router
  ) {}
}
