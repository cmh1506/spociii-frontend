import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Verarbeitung } from "../models/verarbeitung";
import { VerarbeitungsAPIActions, VerarbeitungsPageActions } from "./verarbeitungs.actions";


export interface VerarbeitungsState extends EntityState<Verarbeitung> {}

const adapter: EntityAdapter<Verarbeitung> = createEntityAdapter<Verarbeitung>({
  selectId: selectVerarbeitungId
})

export function selectVerarbeitungId(verarbeitung: Verarbeitung): string {
  //In this case this would be optional since primary key is id
  return verarbeitung._id;
}

const initialState: VerarbeitungsState = adapter.getInitialState({})



export const verarbeitungsReducer = createReducer(
  initialState,
  on(VerarbeitungsPageActions.loadVerarbeitungs, (state) => 
    adapter.setAll([], {...state})
  ),
  on(VerarbeitungsAPIActions.verarbeitungsLoadedSuccess, (state, { verarbeitungs }) => adapter.setAll( verarbeitungs, {...state})),
  on(VerarbeitungsAPIActions.verarbeitungsLoadedFail, (state) => adapter.setAll( [], {...state})),
  on(VerarbeitungsAPIActions.verarbeitungAddedSuccess, (state, {verarbeitung}) => adapter.addOne(verarbeitung, {...state}))
)

export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectVerarbeitungs = selectAll;
export const selectVerarbeitungsEntities = selectEntities;

