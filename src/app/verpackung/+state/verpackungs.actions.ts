import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Verpackung } from "src/app/models/verpackung";

export const VerpackungsPageActions = createActionGroup({
  source: 'Verpackungs Page',
  events: {
    'Load Verpackungs': emptyProps()
  }
})

export const VerpackungsAPIActions = createActionGroup({
  source: 'Verpackungs API',
  events: {
    'Verpackungs Loaded Success': props<{ verpackungs: Verpackung[] }>(),
    'Verpackungs Loaded Failure': props<{ message: string }>(),
  }
})