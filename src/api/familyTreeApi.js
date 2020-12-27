import { handleResponse, handleError } from "./apiUtils";

export function getFamilyTree(token) {
  return fetch("familytree", { headers: { Authorization: token } })
    .then(handleResponse)
    .catch(handleError);
}
