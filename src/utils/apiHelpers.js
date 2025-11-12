export const BASE_URL = "http://localhost:3001";

export const handleResponse = (res) => {
  if (res.ok) return res.json();
  return res.json().then((err) => Promise.reject(err));
};

export const getHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }), 
});
