import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function pictureDetailsReducer(
  state = initalState.pictureDetails,
  action
) {
  switch (action.type) {
    case types.LOAD_PICTURE_DETAILS_SUCCESS:
      return action.pictureDetails;
    case types.UPDATE_PICTURE_DETAILS_SUCCESS:
      return action.pictureDetails;
    default:
      return state;
  }
}
