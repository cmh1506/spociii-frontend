import { Update } from "@ngrx/entity";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Energierueckgewinnung } from "../models/energierueckgewinnung";

export const EnergierueckgewinnungsPageActions = createActionGroup({
  source: 'Energierueckgewinnungs Page',
  events: {
    'Toggle Show Energierueckgewinnung Code': emptyProps(),
    'Load Energierueckgewinnungs': emptyProps(),
    'Add Energierueckgewinnung': props<{energierueckgewinnung: Energierueckgewinnung}>(),
    'Update Energierueckgewinnung': props<{energierueckgewinnung: Energierueckgewinnung}>(),
    'Delete Energierueckgewinnung': props<{id: number}>(),
  },
});

export const EnergierueckgewinnungsAPIActions = createActionGroup({
  source: 'Energierueckgewinnungs API',
  events: {
    'Load Energierueckgewinnungs': emptyProps(),
    'Energierueckgewinnungs Loaded Success': props<{ energierueckgewinnungs: Energierueckgewinnung[] }>(),
    'Energierueckgewinnungs Loaded Fail': props<{ message: string }>(),
    'Energierueckgewinnung Added Success': props<{ energierueckgewinnung: Energierueckgewinnung }>(),
    'Energierueckgewinnung Added Fail': props<{ message: string }>(),
    'Energierueckgewinnung Updated Success': props<{ update: Update<Energierueckgewinnung> }>(),
    'Energierueckgewinnung Updated Fail': props<{ message: string }>(),
    'Energierueckgewinnung Deleted Success': props<{ id: number }>(),
    'Energierueckgewinnung Deleted Fail': props<{ message: string }>(),
  },
});