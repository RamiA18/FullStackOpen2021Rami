import React from "react";
import Button from "./Button";

const Person = ({ name, id, number, onClickFunction }) => {
  return (
    <p>
      {" "}
      {name} {number}{" "}
      <Button onClickEvent={onClickFunction} buttonText="Delete" />
    </p>
  );
};

export default Person;
