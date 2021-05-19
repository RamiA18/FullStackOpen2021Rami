import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer.js";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    );
    const sort = filter.sort((a, b) => b.votes - a.votes);
    return sort;
  });
  const dispatch = useDispatch();
  const handleAddingVote = (id) => {
    const anecdoteVoted = anecdotes.find((a) => a.id === id);
    dispatch(voteAction(id));
    dispatch(
      setNotification(
        `A vote added to the following blog: "${anecdoteVoted.content}"`,
        5
      )
    );
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} className="row my-1">
          <div className="col">
            <div>"{anecdote.content}"</div>
            <div>
              <span className="font-weight-bold">
                {" "}
                has {anecdote.votes} vote(s){" "}
              </span>
              <button
                className="btn btn-outline-success btn-sm mx-2"
                onClick={() => handleAddingVote(anecdote.id)}
              >
                vote
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
