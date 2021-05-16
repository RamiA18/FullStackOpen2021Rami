import React from "react";
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleQueryChange = (event) => {
    const filter = event.target.value;
    dispatch(filterChange(filter));
  };

  return (
    <div className="my-2">
      filter <input onChange={handleQueryChange} />
      <hr />
    </div>
  );
};

export default Filter;
