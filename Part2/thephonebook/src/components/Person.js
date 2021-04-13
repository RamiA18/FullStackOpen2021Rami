import React from "react";

const Person = ({ name, id, number }) => {
  return (
    <p>
      {" "}
      {name} {number}{" "}
    </p>
  );
};

export default Person;
