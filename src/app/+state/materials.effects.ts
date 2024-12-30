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
import { MaterialsAPIActions, MaterialsPageActions } from './materials.actions';
import { MaterialService } from '../material.service';
import { Store } from '@ngrx/store';
import { MaterialsState } from './materials.reducer';

@Injectable()
export class MaterialEffects {

  /* ngrxOnInitEffects() {
    //return MaterialsPageActions.loadMaterials();
  } */
  

  loadMaterials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsPageActions.loadMaterials),
      exhaustMap(() =>
        this.materialService.getAll().pipe(
          tap(() => console.log("in material effect")),
          map((materials) =>
            MaterialsAPIActions.materialsLoadedSuccess({ materials })
          ),
          catchError((error) =>
            of(MaterialsAPIActions.materialsLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  addMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsPageActions.addMaterial),
      concatMap(({ material }) =>
        this.materialService.add(material).pipe(
          map((newMaterial) =>
            MaterialsAPIActions.materialAddedSuccess({ material: newMaterial })
          ),
          catchError((error) =>
            of(MaterialsAPIActions.materialAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsPageActions.updateMaterial),
      concatMap(({ material }) =>
        this.materialService.update(material).pipe(
          map(() =>
            MaterialsAPIActions.materialUpdatedSuccess({
              update: { id: material._id, changes: material },
            })
          ),
          catchError((error) =>
            of(MaterialsAPIActions.materialUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteMaterial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaterialsPageActions.deleteMaterial),
      mergeMap(({ id }) =>
        this.materialService
          .delete(id)
          .pipe(map(() => MaterialsAPIActions.materialDeletedSuccess({ id })))
      ),
      catchError((error) =>
        of(MaterialsAPIActions.materialDeletedFail({ message: error }))
      )
    )
  );

  redirectToMaterialsPage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          MaterialsAPIActions.materialAddedSuccess,
          MaterialsAPIActions.materialUpdatedSuccess,
          MaterialsAPIActions.materialDeletedSuccess
        ),
        tap(() => {
          this.store.dispatch(MaterialsPageActions.loadMaterials())
          this.router.navigate(['/material'])          
        })
      ),
    { dispatch: false }
  );

  constructor(
    private materialService: MaterialService,
    private actions$: Actions,
    private router: Router,
    private store: Store<MaterialsState>
  ) {}
}
