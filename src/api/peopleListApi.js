import { handleResponse, handleError } from "./apiUtils";

export function getPeopleList() {
  return fetch("familytree/list").then(handleResponse).catch(handleError);
}
