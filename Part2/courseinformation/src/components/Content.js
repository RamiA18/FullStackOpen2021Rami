import React from "react";
import Part from "./Part.js";

const Content = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(({ name, exercises, id }) => (
      <Part key={id} partName={name} exercises={exercises} />
    ))}
    </div>
  );
};

export default Content;

