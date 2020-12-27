import * as types from "./actionTypes";
import * as pictureDetailsApi from "../../api/pictutreDetailsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { loadFamilyTree } from "./familyTreeActions";
import { loadPeopleList } from "./peopleListActions";
import { setSelectedPerson } from "./selectedPersonActions";
import intialState from "../reducers/initialState";

export function loadPictureDetailsSuccess(pictureDetails) {
  return { type: types.LOAD_PICTURE_DETAILS_SUCCESS, pictureDetails };
}

export function loadPictureDetailsForUpdateSuccess(pictrueDetails) {
  return { type: types.LOAD_PICTURE_DETAILS_SUCCESS, pictrueDetails };
}

export function updatePictureDetailsSuccess(pictrueDetails) {
  return { type: types.UPDATE_PERSON_DETAILS_SUCCESS, pictrueDetails };
}

export function loadPictureDetails(id, token) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return pictureDetailsApi
      .getPictureDetails(id, token)
      .then((pictureDetails) => {
        dispatch(loadPictureDetailsSuccess(pictureDetails));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updatePictureDetails(pictureDetails, token) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return pictureDetailsApi
      .updatePicture(pictureDetails, token)
      .then((savedPictureDetails) => {
        dispatch(updatePictureDetailsSuccess(savedPictureDetails));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deletePicture(id, token) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return pictureDetailsApi
      .deletePicture(id, token)
      .then(() => {
        dispatch(setSelectedPerson(intialState.selectedPerson));
        dispatch(loadFamilyTree(token));
        dispatch(loadPeopleList(token));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
