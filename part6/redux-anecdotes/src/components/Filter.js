import React from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = ({ filterChange }) => {
  const handleQueryChange = (event) => {
    const filter = event.target.value;
    filterChange(filter);
  };

  return (
    <div className="my-2">
      filter <input onChange={handleQueryChange} />
      <hr />
    </div>
  );
};

const filterConnected = connect(null, { filterChange })(Filter);

export default filterConnected;
