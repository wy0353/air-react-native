import axios from "axios";

const callApi = async (method, path, data, jwt, params = {}) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };
  const baseUrl = "http://121.130.15.124:8002/api/v1";
  const fullUrl = `${baseUrl}${path}`;
  if (method === "get" || method === "delete") {
    return axios[method](fullUrl, { headers, params });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

export default {
  createAccount: form => callApi("post", "/users/", form),
  login: form => callApi("post", "/users/login/", form),
  getUserById: id => callApi("get", `/users/${id}/`),
  toggleFavs: (userId, roomId, token) => callApi("put", `/users/${userId}/favs/`, { pk: roomId }, token),
  favs: (id, token) => callApi("get", `/users/${id}/favs/`, null, token),
  rooms: (page = 1, token) => callApi("get", `/rooms/?page=${page}`, null, token),
  search: (form, token) => callApi("get", "/rooms/search/", null, token, form),
};
