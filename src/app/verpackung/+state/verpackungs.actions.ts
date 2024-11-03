import { Update } from "@ngrx/entity";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Berechnung } from "src/app/models/berechnung";
import { Verpackung } from "src/app/models/verpackung";

export const VerpackungsPageActions = createActionGroup({
  source: 'Verpackungs Page',
  events: {
    'Load Verpackungs': emptyProps(),
    'Add Verpackung': props<{ verpackung: Partial<Verpackung> }>(),
    'Update Verpackung': props<{ verpackung: Partial<Verpackung> }>(),
    'Delete Verpackung': props<{ _id: string }>(),

    'Load Berechnungs': props<{ verpackungId: string }>(),
  }
})

export const VerpackungsAPIActions = createActionGroup({
  source: 'Verpackungs API',
  events: {
    'Verpackungs Loaded Success': props<{ verpackungs: Verpackung[] }>(),
    'Verpackungs Loaded Fail': props<{ message: string }>(),
    'Verpackung Added Success': props<{ verpackung: Verpackung }>(),
    'Verpackung Added Fail': props<{ message: string }>(),
    'Verpackung Updated Success': props<{ update: Update<Verpackung> }>(),
    'Verpackung Updated Fail': props<{ message: string }>(),
    'Verpackung Deleted Success': props<{ _id: string }>(),
    'Verpackung Deleted Fail': props<{ message: string }>(),

    'Berechnungs Loaded Success': props<{ berechnungs: Berechnung[] }>(),
    'Berechnungs Loaded Fail': props<{ message: string }>(),
  }
})