import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Verpackung } from "src/app/models/verpackung";

export const VerpackungsPageActions = createActionGroup({
  source: 'Verpackungs Page',
  events: {
    'Load Verpackungs': emptyProps(),
    'Load Selected Verpackung': props<{_id: string}>()
  }
})

export const VerpackungsAPIActions = createActionGroup({
  source: 'Verpackungs API',
  events: {
    'Verpackungs Loaded Success': props<{ verpackungs: Verpackung[] }>(),
    'Verpackungs Loaded Failure': props<{ message: string }>(),
    'Selected Verpackung Loaded Success': props<{ selectedVerpackung: Verpackung }>(),
    'Selected Verpackung Loaded Failure': props<{ message: string }>(), 
  }
})