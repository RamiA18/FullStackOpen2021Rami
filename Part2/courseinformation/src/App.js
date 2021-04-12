import React from "react";
import AllCourses from "./components/AllCourses.js";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <AllCourses courses={courses} />
    </div>
    // Another way is that we copy the component "AllCourses" data straight into this App component and then we
    // use this code below to map the courses (after importing Course component)
    // {courses.map(course => (<Course key={course.id} course={course} />))}
  );
};

export default App;
