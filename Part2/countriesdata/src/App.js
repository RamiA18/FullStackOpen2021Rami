// PLEASE USE YOUR OWN APIKEY (WEATHER API) HERE OR IN ENV VARIABLE IN ORDER TO GET THE APP TO WORK. WILL BE HARDCODED FOR NOW FOR EDUCATIONAL AND DEMONSTRATION PURPOSES

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const CountryView = ({ list, handleClick, weatherData }) => {
  const listLength = list.length;
  switch (true) {
    case listLength === 1:
      return (
        <div>
          {" "}
          {list.map((country) => (
            <div key={country.name}>
              {" "}
              <h3> Country Data </h3>
              <p>
                <span style={{ fontWeight: "bold" }}>Country: </span>{" "}
                {country.name}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>Capital: </span>{" "}
                {country.capital}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>Language(s): </span>{" "}
                {country.languages.map((language, index) => (
                  <span key={index}>{language.name} </span>
                ))}{" "}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>Currencies: </span>{" "}
                {country.currencies.map((currency, index) => (
                  <span key={index}>{currency.name} </span>
                ))}{" "}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>Currencies: </span>{" "}
                {country.timezones.map((timezone, index) => (
                  <span key={index}>{timezone}</span>
                ))}{" "}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>Population: </span>{" "}
                {country.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <p>
                {" "}
                <span style={{ fontWeight: "bold" }}>Area: </span>{" "}
                {country.area} km(sq){" "}
              </p>
              <img
                src={country.flag}
                alt="countryFlag"
                width="300px"
                height="200px"
              />
              <h4 className="mt-5">
                Current Weather{" "}
                <img
                  src={weatherData.current.weather_icons[0]}
                  alt="weatherStatus"
                  width="30px"
                  height="30px"
                />{" "}
              </h4>
              <p style={{ fontStyle: "italic" }}>
                * Weather Data observed in {weatherData.location.name} at{" "}
                {weatherData.current.observation_time}
              </p>
              <p>
                <span>Current Temperature: </span>{" "}
                {weatherData.current.temperature} C
              </p>
              <p>
                <span>Feels like: </span> {weatherData.current.feelslike} C
              </p>
              <p>
                <span>Current wind: </span> {weatherData.current.temperature}{" "}
                km/h
              </p>
              <p>
                <span>Current visibility: </span>{" "}
                {weatherData.current.visibility}%
              </p>
              <p>
                <span>Current humudidy: </span> {weatherData.current.humidity}%
              </p>
            </div>
          ))}
        </div>
      );

    case listLength > 1 && list.length < 10:
      return (
        <div>
          {" "}
          {list.map((country) => (
            <div className="mt-2" key={country.alpha3Code}>
              {country.name}
              <button
                className="btn btn-info btn-sm ml-1"
                onClick={() => handleClick(country.name)}
              >
                Show
              </button>
            </div>
          ))}{" "}
        </div>
      );

    case list.length >= 10:
      return <div> Please specify the seach query </div>;

    default:
      return <div> No countries to show</div>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [capital, setCapital] = useState("Helsinki");
  const [list, setList] = useState([]);
  const [weatherData, setWeatherData] = useState();

  const apiKey = "82ed6a9ed50e537a10f6af4b08354f02"; // PLEASE USE YOUR OWN APIKEY HERE OR IN ENV VARIABLE IN ORDER TO GET THE APP TO WORK
  const baseLink = "http://api.weatherstack.com/current?";

  useEffect(() => {
    setList(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (list !== null && list !== undefined && list.length === 1) {
      setCapital(list[0].capital);
    }
  }, [list]);

  useEffect(() => {
    if (capital !== null && capital !== undefined && capital !== "") {
      axios
        .get(`${baseLink}access_key=${apiKey}&query=${capital}`)
        .then((response) => {
          setWeatherData(response.data);
          console.log(response.data);
        });
    }
  }, [capital]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container">
      Search Country:{" "}
      <input className="mb-4" onChange={handleSearchChange} value={search} />
      <CountryView
        list={list}
        weatherData={weatherData}
        handleClick={(countrySelector) => setSearch(countrySelector)}
      />
    </div>
  );
};

export default App;
