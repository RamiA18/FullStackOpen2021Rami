import React from "react";
import HeaderThree from "./HeaderThree";
import Person from "./Person";

const Persons = (props) => {
  return (
    <div>
      <HeaderThree text={props.title} />
      {props.persons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default Persons;
