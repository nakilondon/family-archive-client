import * as types from "./actionTypes";
import * as uploadImageApi from "../../api/uploadImageApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function uploadImageSuccess(imageDetails) {
  return { type: types.UPLOAD_IMAGE_SUCCESS, imageDetails };
}

export function uploadImage(image, data) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return uploadImageApi
      .uploadImage(image, data)
      .then((imageDetails) => {
        dispatch(uploadImageSuccess(imageDetails));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
