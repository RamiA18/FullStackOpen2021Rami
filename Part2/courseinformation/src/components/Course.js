import React from "react";
import Header from "./Header.js";
import Content from "./Content.js";
import Sum from "./Sum.js";


const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content courseParts={course.parts} />
      <Sum coursePartsExercises={course.parts} />

    </div>
  );
};

export default Course;
