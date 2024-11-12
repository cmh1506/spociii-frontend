import { Update } from "@ngrx/entity";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Material } from "src/app/models/material";

export const MaterialsPageActions = createActionGroup({
  source: 'Materials Page',
  events: {
    'Toggle Show Material Code': emptyProps(),
    'Load Materials': emptyProps(),
    'Add Material': props<{material: Material}>(),
    'Update Material': props<{material: Material}>(),
    'Delete Material': props<{id: number}>(),
  },
});

export const MaterialsAPIActions = createActionGroup({
  source: 'Materials API',
  events: {
    'Load Materials': emptyProps(),
    'Materials Loaded Success': props<{ materials: Material[] }>(),
    'Materials Loaded Fail': props<{ message: string }>(),
    'Material Added Success': props<{ material: Material }>(),
    'Material Added Fail': props<{ message: string }>(),
    'Material Updated Success': props<{ update: Update<Material> }>(),
    'Material Updated Fail': props<{ message: string }>(),
    'Material Deleted Success': props<{ id: number }>(),
    'Material Deleted Fail': props<{ message: string }>(),
  },
});