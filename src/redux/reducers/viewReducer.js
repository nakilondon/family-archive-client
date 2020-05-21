import initalState from "./initialState";
import * as types from "../actions/actionTypes";

const viewReducer = (state = initalState.view, action) => {
  switch (action.type) {
    case types.SET_VIEW_MODE:
      return action.view;
    default:
      return state;
  }
};

export default viewReducer;
