import { handleResponse, handleError } from "./apiUtils";

export function getFamilyTree() {
  return fetch("familytree").then(handleResponse).catch(handleError);
}
