import React, { useState, useEffect } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const CountryView = ({ list, handleClick }) => {
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
              <div>
                <span style={{ fontWeight: "bold" }}>Language(s): </span>
                <ul>
                  {country.languages.map((language, index) => (
                    <li key={index}>{language.name} </li>
                  ))}
                </ul>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Currencies: </span>{" "}
                <ul>
                  {country.currencies.map((currency, index) => (
                    <li key={index}>{currency.name} </li>
                  ))}
                </ul>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Timezone(s): </span>
                <ul>
                  {country.timezones.map((timezone, index) => (
                    <li key={index}>{timezone}</li>
                  ))}
                </ul>
              </div>
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
  const [list, setList] = useState([]);

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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container">
      Search Country:{" "}
      <input className="mb-4" onChange={handleSearchChange} value={search} />
      <CountryView
        list={list}
        handleClick={(countrySelector) => setSearch(countrySelector)}
      />
    </div>
  );
};

export default App;
