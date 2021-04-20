import React from "react";

const filter = (props) => {
  return (
    <div>
      {" "}
      Search Person: <input
        value={props.value}
        onChange={props.handleChange}
      />{" "}
    </div>
  );
};

export default filter;
