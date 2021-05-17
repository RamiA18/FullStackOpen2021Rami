
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

export const createAnecdoteAction = (anecdote) => ({
  type: "NEW_ANECDOTE",
  data: anecdote,
});

export const voteAction = (id) => ({
  type: "ADD_VOTE",
  data: { id },
});

export const initializeAnecdotes = (anecdotes) => ({
  type: "INITIALIZE_ANECDOTES",
  data: anecdotes,
});

export default reducer;
