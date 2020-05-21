import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function personDetailsReducer(
  state = initalState.personDetails,
  action
) {
  switch (action.type) {
    case types.LOAD_PERSON_DETAILS_SUCCESS:
      return action.personDetails;
    case types.UPDATE_PERSON_DETAILS_SUCCESS:
      return action.savedPersonDetails;
    case types.CREATE_PERSON_DETAILS_SUCCESS:
      return action.savedPersonDetails;
    default:
      return state;
  }
}
