import { Update } from "@ngrx/entity";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Verarbeitung } from "../models/verarbeitung";

export const VerarbeitungsPageActions = createActionGroup({
  source: 'Verarbeitungs Page',
  events: {
    'Toggle Show Verarbeitung Code': emptyProps(),
    'Load Verarbeitungs': emptyProps(),
    'Add Verarbeitung': props<{verarbeitung: Verarbeitung}>(),
    'Update Verarbeitung': props<{verarbeitung: Verarbeitung}>(),
    'Delete Verarbeitung': props<{id: number}>(),
  },
});

export const VerarbeitungsAPIActions = createActionGroup({
  source: 'Verarbeitungs API',
  events: {
    'Load Verarbeitungs': emptyProps(),
    'Verarbeitungs Loaded Success': props<{ verarbeitungs: Verarbeitung[] }>(),
    'Verarbeitungs Loaded Fail': props<{ message: string }>(),
    'Verarbeitung Added Success': props<{ verarbeitung: Verarbeitung }>(),
    'Verarbeitung Added Fail': props<{ message: string }>(),
    'Verarbeitung Updated Success': props<{ update: Update<Verarbeitung> }>(),
    'Verarbeitung Updated Fail': props<{ message: string }>(),
    'Verarbeitung Deleted Success': props<{ id: number }>(),
    'Verarbeitung Deleted Fail': props<{ message: string }>(),
  },
});