import { Injectable } from "@angular/core";
import { VerpackungService } from "../verpackung.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VerpackungsAPIActions, VerpackungsPageActions } from "./verpackungs.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { VerpackungsState } from "./verpackungs.reducer";

@Injectable()
export class VerpackungsEffects {
  constructor(private verpackungsService: VerpackungService,
    private actions$: Actions
  ) { }

  ngrxOnInitEffects() {
    return VerpackungsPageActions.loadVerpackungs();
  }

  /* loadVerpackungs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerpackungsPageActions.loadVerpackungs),
      concatMap(() => this.service.getAll().pipe(
        map((verpackungs) => VerpackungsAPIActions.verpackungsLoadedSuccess({ verpackungs })),
        catchError((error) =>
          of(VerpackungsAPIActions.verpackungsLoadedFailure({ message: error }))
        )
      ))
    )
  ) */

  loadVerpackungs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerpackungsPageActions.loadVerpackungs),
      exhaustMap(() =>
        this.verpackungsService.getAll().pipe(
          map((verpackungs) =>
            VerpackungsAPIActions.verpackungsLoadedSuccess({ verpackungs })
          ),
          catchError((error) =>
            of(VerpackungsAPIActions.verpackungsLoadedFail({ message: error }))
          )
        )
      )
    )
  );
  
  addVerpackung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerpackungsPageActions.addVerpackung),
      concatMap(({ verpackung }) =>
        this.verpackungsService.add(verpackung).pipe(
          map((newVerpackung) =>
            VerpackungsAPIActions.verpackungAddedSuccess({ verpackung: newVerpackung })
          ),
          catchError((error) =>
            of(VerpackungsAPIActions.verpackungAddedFail({ message: error }))
          )
        )
      )
    )
  );
  
  updateVerpackung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerpackungsPageActions.updateVerpackung),
      concatMap(({ verpackung }) =>
        this.verpackungsService.update(verpackung).pipe(
          map(() =>
            VerpackungsAPIActions.verpackungUpdatedSuccess({
              update: { id: verpackung._id ? verpackung._id : "Fuck it" , changes: verpackung },
            })
          ),          
          catchError((error) =>
            of(VerpackungsAPIActions.verpackungUpdatedFail({ message: error }))
          )
        )
      )
    )
  );
  
  deleteVerpackung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerpackungsPageActions.deleteVerpackung),
      mergeMap(({ _id }) =>
        this.verpackungsService
          .delete(_id)
          .pipe(map(() => VerpackungsAPIActions.verpackungDeletedSuccess({ _id })))
      ),
      catchError((error) =>
        of(VerpackungsAPIActions.verpackungDeletedFail({ message: error }))
      )
    )
  );

  loadBerechnungs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerpackungsPageActions.loadBerechnungs),
      exhaustMap((action) =>
        this.verpackungsService.getBerechnungs(action.verpackungId).pipe(
          map((berechnungs) =>
            VerpackungsAPIActions.berechnungsLoadedSuccess({ berechnungs })
          ),
          catchError((error) =>
            of(VerpackungsAPIActions.berechnungsLoadedFail({ message: error }))
          )
        )
      )
    )
  );
  

  

}