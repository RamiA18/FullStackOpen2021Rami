import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();
  const handleAddingVote = (id) => {
    dispatch(voteAction(id));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleAddingVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
