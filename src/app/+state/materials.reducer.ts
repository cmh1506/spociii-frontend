import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { MaterialsAPIActions, MaterialsPageActions } from "./materials.actions";
import { Material } from "../models/material";


export interface MaterialsState extends EntityState<Material> {}

const adapter: EntityAdapter<Material> = createEntityAdapter<Material>({
  selectId: selectMaterialId
})

export function selectMaterialId(a: Material): string {
  //In this case this would be optional since primary key is id
  return a._id;
}

const initialState: MaterialsState = adapter.getInitialState({})



export const materialsReducer = createReducer(
  initialState,
  on(MaterialsPageActions.loadMaterials, (state) => 
    adapter.setAll([], {...state})
  ),
  on(MaterialsAPIActions.materialsLoadedSuccess, (state, { materials }) => adapter.setAll( materials, {...state})),
  on(MaterialsAPIActions.materialsLoadedFail, (state) => adapter.setAll( [], {...state})),
  on(MaterialsAPIActions.materialAddedSuccess, (state, {material}) => adapter.addOne(material, {...state}))
)

export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectMaterials = selectAll;
export const selectMaterialsEntities = selectEntities;

