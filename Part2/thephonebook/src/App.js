import React, { useState, useEffect } from "react";
import HeaderTwo from "./components/HeaderTwo.js";
import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/Persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const filterName = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (filterName.length > 0) {
      alert(newName + " is existing");
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const personsToShow =
    filterQuery === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterQuery.toLowerCase())
        );

  return (
    <div>
      <HeaderTwo text="PhoneBook" />
      <Filter value={filterQuery} handleChange={handleFilterChange} />
      <PersonForm
        title="Add New"
        submitAction={addPerson}
        nameValue={newName}
        nameChangeHandling={handleNameChange}
        numberValue={newNumber}
        numberChangeHandling={handleNumberChange}
      />
      <Persons title="Numbers" persons={personsToShow} />
    </div>
  );
};

export default App;
