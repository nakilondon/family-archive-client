import { handleResponse, handleError } from "./apiUtils";

export function getPeopleList(token) {
  return fetch("familytree/list", { headers: { Authorization: token } })
    .then(handleResponse)
    .catch(handleError);
}
