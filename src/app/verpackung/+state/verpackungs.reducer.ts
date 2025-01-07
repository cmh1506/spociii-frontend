import { createReducer, on } from "@ngrx/store";
import { VerpackungsAPIActions, VerpackungsPageActions } from "./verpackungs.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Verpackung } from "../../models/verpackung";
import { Berechnung } from "../../models/berechnung";
import { UserPageActions } from "../../+state/user.actions";

export interface VerpackungsState extends EntityState<Verpackung> {
  errorMessage: string,
  berechnungs: Berechnung[]
}

export const adapter: EntityAdapter<Verpackung> = createEntityAdapter<Verpackung>({
  selectId: selectVerpackungsId

})

export function selectVerpackungsId(a: Verpackung): string {
  //In this case this would be optional since primary key is id
  return a._id;
}

const initialState: VerpackungsState = adapter.getInitialState({
  errorMessage: '',
  berechnungs: []
})

export const verpackungReducer = createReducer(
  initialState,
  on(VerpackungsAPIActions.verpackungsLoadedSuccess, (state, { verpackungs }) =>
    adapter.addMany(verpackungs, {
      ...state,
    })
  ),
  on(VerpackungsAPIActions.verpackungsLoadedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(VerpackungsPageActions.addVerpackung, (state) => ({
    ...state,
    errorMessage: '',
  })),
  on(VerpackungsAPIActions.verpackungAddedSuccess, (state, { verpackung }) =>
    adapter.addOne(verpackung, {
      ...state,
    })
  ),
  on(VerpackungsAPIActions.verpackungAddedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(VerpackungsPageActions.updateVerpackung, (state) => ({
    ...state,
    errorMessage: '',
  })),
  on(VerpackungsAPIActions.verpackungUpdatedSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
    })
  ),
  on(VerpackungsAPIActions.verpackungUpdatedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(VerpackungsPageActions.deleteVerpackung, (state) => ({
    ...state,
    errorMessage: '',
  })),
  on(VerpackungsAPIActions.verpackungDeletedSuccess, (state, { _id }) =>
    adapter.removeOne(_id, {
      ...state
    })
  ),
  on(VerpackungsAPIActions.verpackungDeletedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),

  on(VerpackungsAPIActions.berechnungsLoadedSuccess, (state, action) => {
    return {
      ...state,
      berechnungs: action.berechnungs
    }
  }
  ),
  on(VerpackungsAPIActions.verpackungsLoadedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(UserPageActions.logoutUser, (state) =>
    adapter.removeAll({
      ...state,
      berechnungs: []
    })
  ),
)

export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectVerpackungs = selectAll;
export const selectVerpackungsEntities = selectEntities;