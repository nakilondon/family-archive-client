import * as types from "./actionTypes";
import * as personDetailsApi from "../../api/personDetailsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { loadFamilyTree } from "./familyTreeActions";
import { loadPeopleList } from "./peopleListActions";

export function loadPersonDetailsSuccess(personDetails) {
  return { type: types.LOAD_PERSON_DETAILS_SUCCESS, personDetails };
}

export function updatePersonDetailsSuccess(savedPersonDetails) {
  return { type: types.UPDATE_PERSON_DETAILS_SUCCESS, savedPersonDetails };
}

export function createPersonDetailsSuccess(savedPersonDetails) {
  return { type: types.CREATE_PERSON_DETAILS_SUCCESS, savedPersonDetails };
}

export function loadPersonDetails(id) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return personDetailsApi
      .getPersonDetails(id)
      .then((personDetails) => {
        dispatch(loadPersonDetailsSuccess(personDetails));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function savePerson(personDetails) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return personDetailsApi
      .savePerson(personDetails)
      .then((savedPersonDetails) => {
        personDetails.id
          ? dispatch(updatePersonDetailsSuccess(savedPersonDetails))
          : dispatch(createPersonDetailsSuccess(savedPersonDetails));
        dispatch(loadFamilyTree());
        dispatch(loadPeopleList());
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
