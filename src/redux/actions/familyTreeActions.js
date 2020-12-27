import * as types from "./actionTypes";
import * as familyTreeApi from "../../api/familyTreeApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadFamilyTreeSuccess(familyTree) {
  return { type: types.LOAD_FAMILY_TREE_SUCCESS, familyTree };
}

export function loadFamilyTree(token) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return familyTreeApi
      .getFamilyTree(token)
      .then((familyTree) => {
        dispatch(loadFamilyTreeSuccess(familyTree));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
