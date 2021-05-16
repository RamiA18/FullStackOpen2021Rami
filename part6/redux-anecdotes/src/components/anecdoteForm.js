import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdoteAction } from "../reducers/anecdoteReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handlingAddAnecdote = (event) => {
    event.preventDefault();
    const anecdoteContent = event.target.anecdote.value;
    dispatch(createAnecdoteAction(anecdoteContent));
  };

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={handlingAddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Add New</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
