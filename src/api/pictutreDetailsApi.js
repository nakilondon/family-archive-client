import { handleResponse, handleError } from "./apiUtils";

export function getPictureDetails(id, token) {
  return fetch(`picture/${id}`, { headers: { Authorization: token } })
    .then(handleResponse)
    .catch(handleError);
}

export function updatePicture(pictureDetails, token) {
  let json = JSON.stringify(pictureDetails);
  return fetch(`picture`, {
    method: "PUT",
    headers: { "content-type": "application/json", Authorization: token },
    body: json,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePicture(id, token) {
  return fetch(`picture/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  })
    .then(handleResponse)
    .catch(handleError);
}
