import { handleResponse, handleError } from "./apiUtils";

export function getPersonDetails(id) {
  return fetch(`familytree/${id}`).then(handleResponse).catch(handleError);
}

export function savePerson(personDetails) {
  return fetch(`familytree/update`, {
    method: personDetails.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(personDetails),
  })
    .then(handleResponse)
    .catch(handleError);
}
