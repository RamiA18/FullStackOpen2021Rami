import React from "react";
import { TotalProps } from "../types";

const Total = ({ total }: TotalProps) => {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <p>
        <b>Number of exercises: </b> {total}
      </p>
    </div>
  );
};

export default Total;
