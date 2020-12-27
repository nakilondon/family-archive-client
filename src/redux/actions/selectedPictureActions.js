import * as types from "./actionTypes";

export function setSelectedPicture(id) {
  return { type: types.SET_SELECTED_PICTURE, id };
}
