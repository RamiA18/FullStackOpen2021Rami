import React, { useState, useEffect } from "react";
import HeaderTwo from "./components/HeaderTwo.js";
import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";
import personServices from "./services/persons.js";
import Notification from "./components/Notification.js";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    personServices.getAll().then((people) => {
      setPersons(people);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`are you sure you want to delete ${name}?`)) {
      personServices.deleteData(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotification({
          errorMessage: "the person has been deleted",
          errorType: "rejected",
        });
        setTimeout(() => setNotification(""), 5000);
      });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, do you want to update the information?`
        )
      ) {
        personServices
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setNotification({
              errorMessage: `${newName} has been modified`,
              errorType: "accepted",
            });
            setTimeout(() => setNotification(""), 5000);

          })
          .catch((error) => {
            setNotification({
              errorMessage: `${newName} has been deleted already from the server`,
              errorType: "rejected",
            });
            setPersons(persons.filter((p) => p.name !== newName));
            setTimeout(() => setNotification(""), 5000);
          });
      }
    } else {
      personServices
      .create(personObject)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNotification({
          errorMessage: `${newName} has been added`,
          errorType: "accepted",
        });
        setTimeout(() => setNotification(""), 5000);
      })
      .catch((error) => {
        setNotification({
          errorMessage: error.response.data.error,
          errorType: "rejected",
        });
        setTimeout(() => setNotification(""), 5000);
      });
    }
  };

  const personsToShow =
    filterQuery === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterQuery.toLowerCase())
        );

  return (
    <div className="container">
      <HeaderTwo text="PhoneBook" />
      <Notification
        message={notification}
        messageText={notification.errorMessage}
        messageType={notification.errorType}
      />
      <Filter value={filterQuery} handleChange={handleFilterChange} />
      <PersonForm
        title="Add New"
        submitAction={addPerson}
        nameValue={newName}
        nameChangeHandling={handleNameChange}
        numberValue={newNumber}
        numberChangeHandling={handleNumberChange}
      />
      <Persons
        title="Numbers"
        persons={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
