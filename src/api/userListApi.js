import { handleResponse, handleError } from "./apiUtils";

export function getUserList(token) {
  return fetch("users/list", { headers: { Authorization: token } })
    .then(handleResponse)
    .catch(handleError);
}

export function saveUser(userDetails, token) {
  let json = JSON.stringify(userDetails);
  return fetch(`users`, {
    method: userDetails.uid === 0 ? "POST" : "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json", Authorization: token },
    body: json,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteUser(uid, token) {
  return fetch(`users/${uid}`, {
    method: "DELETE",
    headers: { Authorization: token },
  })
    .then(handleResponse)
    .catch(handleError);
}
