import React from "react";

const Part = (props) => {
  return (
    <p>
      {props.partName}: {props.exercises}
    </p>
  );
};

export default Part;
