import initalState from "./initialState";
import * as types from "../actions/actionTypes";

const viewReducer = (state = initalState.selectedPerson, action) => {
  switch (action.type) {
    case types.SET_SELECTED_PERSON:
      return action.id;
    case types.CREATE_PERSON_DETAILS_SUCCESS:
      return action.savedPersonDetails.id;
    default:
      return state;
  }
};

export default viewReducer;
