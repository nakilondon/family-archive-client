import { handleResponse, handleError } from "./apiUtils";

export function getPersonDetails(id, token) {
  return fetch(`familytree/${id}`, { headers: { Authorization: token } })
    .then(handleResponse)
    .catch(handleError);
}

export function getPersonDetailsForUpdate(id, token) {
  return fetch(`familytree/update/${id}`, { headers: { Authorization: token } })
    .then(handleResponse)
    .catch(handleError);
}

export function savePerson(personDetails) {
  return fetch(`familytree`, {
    method: personDetails.id === 0 ? "POST" : "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(personDetails),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePerson(id) {
  return fetch(`familytree/${id}`, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
