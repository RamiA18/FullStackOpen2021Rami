const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER_QUERY":
      return action.filter;

    default:
      return state;
  }
};

export const filterChange = (filter) => {
  return {
    type: "SET_FILTER_QUERY",
    filter,
  };
};

export default filterReducer;
