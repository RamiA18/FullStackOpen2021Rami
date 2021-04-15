import React from "react";
import HeaderThree from "./HeaderThree";
import Person from "./Person";

const Persons = ({ title, persons, handleDelete }) => {
  return (
    <div>
      <HeaderThree text={title} />
      {persons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onClickFunction={() => handleDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default Persons;
