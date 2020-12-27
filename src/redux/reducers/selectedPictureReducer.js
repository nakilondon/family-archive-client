import initalState from "./initialState";
import * as types from "../actions/actionTypes";

const viewReducer = (state = initalState.selectedPicture, action) => {
  switch (action.type) {
    case types.SET_SELECTED_PICTURE:
      return action.id;
    default:
      return state;
  }
};

export default viewReducer;
