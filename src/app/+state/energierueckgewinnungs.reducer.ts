import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { EnergierueckgewinnungsAPIActions, EnergierueckgewinnungsPageActions } from "./energierueckgewinnungs.actions";
import { Energierueckgewinnung } from "../models/energierueckgewinnung";


export interface EnergierueckgewinnungsState extends EntityState<Energierueckgewinnung> {}

const adapter: EntityAdapter<Energierueckgewinnung> = createEntityAdapter<Energierueckgewinnung>({
  selectId: selectEnergierueckgewinnungId
})

export function selectEnergierueckgewinnungId(a: Energierueckgewinnung): string {
  //In this case this would be optional since primary key is id
  return a._id;
}

const initialState: EnergierueckgewinnungsState = adapter.getInitialState({})



export const energierueckgewinnungsReducer = createReducer(
  initialState,
  on(EnergierueckgewinnungsPageActions.loadEnergierueckgewinnungs, (state) => 
    adapter.setAll([], {...state})
  ),
  on(EnergierueckgewinnungsAPIActions.energierueckgewinnungsLoadedSuccess, (state, { energierueckgewinnungs }) => adapter.setAll( energierueckgewinnungs, {...state})),
  on(EnergierueckgewinnungsAPIActions.energierueckgewinnungsLoadedFail, (state) => adapter.setAll( [], {...state})),
  on(EnergierueckgewinnungsAPIActions.energierueckgewinnungAddedSuccess, (state, {energierueckgewinnung}) => adapter.addOne(energierueckgewinnung, {...state}))
)

export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectEnergierueckgewinnungs = selectAll;
export const selectEnergierueckgewinnungsEntities = selectEntities;

