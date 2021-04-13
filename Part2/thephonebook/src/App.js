import React, { useState } from "react";
import HeaderTwo from "./components/HeaderTwo.js";
import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

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
