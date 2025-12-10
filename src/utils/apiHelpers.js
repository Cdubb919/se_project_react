export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrcdubb.localghost.org"
    : "http://localhost:3001";


export const handleResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(res.status);
};

export const getHeaders = (token) => ({
  "Accept": "application/json",
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});
