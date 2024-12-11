import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { TransportmittelsAPIActions, TransportmittelsPageActions } from "./transportmittels.actions";
import { Transportmittel } from "../models/transportmittel";


export interface TransportmittelsState extends EntityState<Transportmittel> {}

const adapter: EntityAdapter<Transportmittel> = createEntityAdapter<Transportmittel>({
  selectId: selectTransportmittelId
})

export function selectTransportmittelId(a: Transportmittel): string {
  //In this case this would be optional since primary key is id
  return a._id;
}

const initialState: TransportmittelsState = adapter.getInitialState({})



export const transportmittelsReducer = createReducer(
  initialState,
  on(TransportmittelsPageActions.loadTransportmittels, (state) => 
    adapter.setAll([], {...state})
  ),
  on(TransportmittelsAPIActions.transportmittelsLoadedSuccess, (state, { transportmittels }) => adapter.setAll( transportmittels, {...state})),
  on(TransportmittelsAPIActions.transportmittelsLoadedFail, (state) => adapter.setAll( [], {...state})),
  on(TransportmittelsAPIActions.transportmittelAddedSuccess, (state, {transportmittel}) => adapter.addOne(transportmittel, {...state}))
)

export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectTransportmittels = selectAll;
export const selectTransportmittelsEntities = selectEntities;

