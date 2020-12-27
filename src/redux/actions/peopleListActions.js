import * as types from "./actionTypes";
import * as peopleListApi from "../../api/peopleListApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPeopleListSuccess(peopleList) {
  return { type: types.LOAD_PEOPLE_LIST_SUCCESS, peopleList };
}

export function loadPeopleList(token) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return peopleListApi
      .getPeopleList(token)
      .then((peopleList) => {
        dispatch(loadPeopleListSuccess(peopleList));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
