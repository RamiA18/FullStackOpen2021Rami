import React, { useState, useEffect } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.css"


const CountryView = ({list, handleClick}) => {
  const listLength = list.length
  switch (true) {
    case (listLength === 1):
      return ( <div> {list.map((country) =>  (
              <div key={country.name}>
                <p> <span style={{fontWeight: "bold"}}>Country: </span> {country.name}</p>
                <p> <span style={{fontWeight: "bold"}}>Capital: </span> {country.capital}</p>
                <p> <span style={{fontWeight: "bold"}}>Language(s): </span> {country.languages.map(((language, index) => (<span key={index}>{language.name} </span>)))} </p>
                <p> <span style={{fontWeight: "bold"}}>Currencies: </span>  {country.currencies.map(((currency, index) => (<span key={index}>{currency.name} </span>)))} </p>
                <p> <span style={{fontWeight: "bold"}}>Currencies: </span> {country.timezones.map(((timezone, index) => (<span key={index}>{timezone}</span>)))} </p>
                <p> <span style={{fontWeight: "bold"}}>Population: </span>  {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p> <span style={{fontWeight: "bold"}}>Area: </span>  {country.area} km(sq) </p>
                <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              width="300px"
              height="200px"
            />
              </div>              
              ))} 
              </div> 
    ) 
    
    case (listLength > 1 && list.length < 10):
    return (
      <div> {list.map((country) => (
        <div key={country.alpha3Code}>
          {country.name}
          <button onClick={() => handleClick(country.name)} >Show</button>
        </div>
      ))} </div>
    )  


    

    case (list.length >= 10):
    return (<div> more than 10 </div>) 
    
    
    default:
        return (
          <div> no countries to show</div>
        )
}
}




const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);



useEffect(() => {
  setList(countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())))
}, [search, countries]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className="container">
      Search Country: <input onChange={handleSearchChange} value={search} />
      <br />
      <CountryView list={list} handleClick={(countrySelector)=> setSearch(countrySelector)} />


      </div>
  );
};

export default App;