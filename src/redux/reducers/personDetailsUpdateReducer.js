import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function personDetailsReducer(
  state = initalState.personDetailsUpdate,
  action
) {
  switch (action.type) {
    case types.LOAD_PERSON_DETAILS_FOR_UPDATE_SUCCESS:
      return action.personDetails;
    default:
      return state;
  }
}
