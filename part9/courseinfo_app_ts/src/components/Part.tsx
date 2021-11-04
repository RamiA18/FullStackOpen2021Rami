import React from "react";
// import {CoursePart} from './../types'
import { PartProps } from "./../types";

const Part = (props: PartProps) => {
  const { part } = props;

  switch (part.type) {
    case "normal":
      return (
        <div style={{ marginTop: "1.5rem" }}>
          <h3 key={part.name}>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case "groupProject":
      return (
        <div style={{ marginTop: "1.5rem" }}>
          <h3 key={part.name}>
            {part.name} {part.exerciseCount}
          </h3>
          <p>Exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div style={{ marginTop: "1.5rem" }}>
          <h3 key={part.name}>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <i>{part.description}</i>
          </p>
          <p>
            Submit to:{" "}
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </p>
        </div>
      );
    case "special":
      return (
        <div style={{ marginTop: "1.5rem" }}>
          <h3 key={part.name}>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <i>{part.description}</i>
          </p>
          <p>Prerequisites: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return (
        <div>
          <p>NOT FOUND, ERROR</p>
        </div>
      );
  }
};

export default Part;
