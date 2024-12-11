import { Update } from "@ngrx/entity";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Transportmittel } from "../models/transportmittel";

export const TransportmittelsPageActions = createActionGroup({
  source: 'Transportmittels Page',
  events: {
    'Toggle Show Transportmittel Code': emptyProps(),
    'Load Transportmittels': emptyProps(),
    'Add Transportmittel': props<{transportmittel: Transportmittel}>(),
    'Update Transportmittel': props<{transportmittel: Transportmittel}>(),
    'Delete Transportmittel': props<{id: number}>(),
  },
});

export const TransportmittelsAPIActions = createActionGroup({
  source: 'Transportmittels API',
  events: {
    'Load Transportmittels': emptyProps(),
    'Transportmittels Loaded Success': props<{ transportmittels: Transportmittel[] }>(),
    'Transportmittels Loaded Fail': props<{ message: string }>(),
    'Transportmittel Added Success': props<{ transportmittel: Transportmittel }>(),
    'Transportmittel Added Fail': props<{ message: string }>(),
    'Transportmittel Updated Success': props<{ update: Update<Transportmittel> }>(),
    'Transportmittel Updated Fail': props<{ message: string }>(),
    'Transportmittel Deleted Success': props<{ id: number }>(),
    'Transportmittel Deleted Fail': props<{ message: string }>(),
  },
});