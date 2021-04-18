import axios from "axios";

const baseUrl = "https://restcountries.eu/rest/v2/all";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const deleteData = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAll: getAll,
  create: create,
  update: update,
  deleteData: deleteData,
};
