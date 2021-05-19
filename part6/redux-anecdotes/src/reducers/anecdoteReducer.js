import anecdoteService from "../services/anecdotes.js";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_ANECDOTES":
      return action.data;

    case "NEW_ANECDOTE":
      return [...state, action.data];

    case "ADD_VOTE":
      return state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );

    default:
      return state;
  }
};

// export const createAnecdoteAction = (anecdote) => ({
//   type: "NEW_ANECDOTE",
//   data: anecdote,
// });

export const createAnecdoteAction = (anecdote) => {
  return async (dispatch) => {
    const anecdoteCreated = await anecdoteService.createNew(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      data: anecdoteCreated,
    });
  };
};

export const voteAction = (id) => {
  return async (dispatch) => {
    const voteUpdate = await anecdoteService.updateVote(id);
    dispatch({
      type: "ADD_VOTE",
      data: { id },
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INITIALIZE_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;
