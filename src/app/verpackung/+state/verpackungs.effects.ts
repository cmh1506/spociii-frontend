import { selectVerpackungs } from './verpackungs.selectors';
import { Injectable } from "@angular/core";
import { VerpackungService } from "../verpackung.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VerpackungsAPIActions, VerpackungsPageActions } from "./verpackungs.actions";
import { catchError, concatMap, map, of, switchMap } from "rxjs";

@Injectable()
export class VerpackungsEffects {
  constructor(private service: VerpackungService,
    private actions$: Actions
  ) { }

  loadVerpackungs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerpackungsPageActions.loadVerpackungs),
      concatMap(() => this.service.getAll().pipe(
        map((verpackungs) => VerpackungsAPIActions.verpackungsLoadedSuccess({ verpackungs })),
        catchError((error) =>
          of(VerpackungsAPIActions.verpackungsLoadedFailure({ message: error }))
        )
      ))
    )
  )

  loadSelectedVerpackung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerpackungsPageActions.loadSelectedVerpackung),
      concatMap((action) => this.service.getVerpackung(action._id).pipe(
        map((selectedVerpackung) => VerpackungsAPIActions.selectedVerpackungLoadedSuccess({ selectedVerpackung })),
        catchError((error) =>
          of(VerpackungsAPIActions.selectedVerpackungLoadedFailure({ message: error }))
        )
      ))
    )
  )

}