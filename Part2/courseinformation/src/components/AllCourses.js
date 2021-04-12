import React from "react";
import Course from "./Course.js";

const AllCourses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default AllCourses;
