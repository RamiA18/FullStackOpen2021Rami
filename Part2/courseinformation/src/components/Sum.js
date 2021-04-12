import React from "react";

const Sum = ({ coursePartsExercises }) => {
  const totalSum = coursePartsExercises.reduce(
    (acc, part) => acc + part.exercises,
    0
  );

  return <p style={{ fontWeight: "bold" }}>Total of {totalSum} exercises</p>;
};

export default Sum;
