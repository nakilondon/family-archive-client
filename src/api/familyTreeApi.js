import { handleResponse, handleError } from "./apiUtils";
//const baseUrl = process.env.REACT_APP_API_URL + "/familytree/";
const baseUrl = "familytree/";

export function getFamilyTree() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
