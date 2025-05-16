import axios from "axios";
const baseURL = "http://localhost:3001";

const getPersons = () =>
  axios.get(`${baseURL}/persons`).then((response) => response.data);

const createPerson = (newObj) =>
  axios.post(`${baseURL}/persons`, newObj).then((response) => response.data);

export default { getPersons, createPerson };
