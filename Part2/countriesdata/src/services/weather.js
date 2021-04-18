import axios from "axios";

const baseUrl = "http://api.weatherstack.com/current";
const ACCESS_KEY = "82ed6a9ed50e537a10f6af4b08354f02";


const getWeather = (capital) => {
  const request = axios.get(`${baseUrl}?access_key=${ACCESS_KEY}&query=${capital}`);
  return request.then((response) => response.data);
};

export default getWeather;
