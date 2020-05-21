import * as types from "./actionTypes";

export function setSelectedPerson(id) {
  return { type: types.SET_SELECTED_PERSON, id };
}
