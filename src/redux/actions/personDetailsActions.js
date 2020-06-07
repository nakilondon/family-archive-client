import * as types from "./actionTypes";
import * as personDetailsApi from "../../api/personDetailsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { loadFamilyTree } from "./familyTreeActions";
import { loadPeopleList } from "./peopleListActions";
import { setSelectedPerson } from "./selectedPersonActions";
import intialState from "../reducers/initialState";
import { setViewMode } from "./viewActions";

export function loadPersonDetailsSuccess(personDetails) {
  return { type: types.LOAD_PERSON_DETAILS_SUCCESS, personDetails };
}

export function loadPersonDetailsForUpdateSuccess(personDetails) {
  return { type: types.LOAD_PERSON_DETAILS_FOR_UPDATE_SUCCESS, personDetails };
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

export function loadPersonDetailsForUpdate(id) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return personDetailsApi
      .getPersonDetailsForUpdate(id)
      .then((personDetails) => {
        dispatch(loadPersonDetailsForUpdateSuccess(personDetails));
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
        personDetails.id === 0
          ? dispatch(createPersonDetailsSuccess(savedPersonDetails))
          : dispatch(updatePersonDetailsSuccess(savedPersonDetails));
        dispatch(loadFamilyTree());
        dispatch(loadPeopleList());
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deletePerson(id) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return personDetailsApi
      .deletePerson(id)
      .then(() => {
        dispatch(setSelectedPerson(intialState.selectedPerson));
        dispatch(loadFamilyTree());
        dispatch(loadPeopleList());
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
