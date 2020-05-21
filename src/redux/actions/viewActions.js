import * as types from "./actionTypes";

export function setViewMode(view) {
  return { type: types.SET_VIEW_MODE, view };
}
