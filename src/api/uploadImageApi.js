import { handleResponse, handleError } from "./apiUtils";

export function uploadImage(image, data) {
  const url = `familytree/upload`;
  const formData = new FormData();

  formData.append("details", JSON.stringify(data));
  formData.append("file", image);

  return fetch(url, { method: "Post", body: formData })
    .then(handleResponse)
    .catch(handleError);
}
