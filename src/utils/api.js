import { BASE_URL, handleResponse, getHeaders } from "./apiHelpers";

export const getItems = (token) => {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: getHeaders(token),
  }).then(handleResponse);
};

export const addItem = (item, token) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(item),
  }).then(handleResponse);
};

export const removeItem = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  }).then(handleResponse);
};

export const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: getHeaders(token),
  }).then(handleResponse);
};

export const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: getHeaders(token),
  }).then(handleResponse);
};

export const updateUser = (userData, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify(userData),
  }).then(handleResponse);
};
