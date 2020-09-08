import * as types from "./actionTypes";
import * as userListApi from "../../api/userListApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadUserListSuccess(userList) {
  return { type: types.LOAD_USER_LIST_SUCCESS, userList };
}

export function updateUserSuccess(savedUserDetails) {
  return { type: types.UPDATE_USER_SUCCESS, savedUserDetails };
}

export function loadUserList(token) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userListApi
      .getUserList(token)
      .then((userList) => {
        dispatch(loadUserListSuccess(userList));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteUser(uid, token) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userListApi
      .deleteUser(uid, token)
      .then(() => {
        dispatch(loadUserList(token));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveUser(userDetails, token) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userListApi
      .saveUser(userDetails, token)
      .then(() => {
        dispatch(updateUserSuccess(userDetails));
        dispatch(loadUserList(token));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
