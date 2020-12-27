import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function imageUploadReducer(
  state = initalState.imageDetails,
  action
) {
  switch (action.type) {
    case types.UPLOAD_IMAGE_SUCCESS:
      return action.imageDetails;
    default:
      return state;
  }
}
