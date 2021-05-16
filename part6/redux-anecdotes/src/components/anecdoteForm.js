import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdoteAction } from "../reducers/anecdoteReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handlingAddAnecdote = (event) => {
    event.preventDefault();
    const anecdoteContent = event.target.anecdote.value;
    dispatch(createAnecdoteAction(anecdoteContent));
    dispatch(
      setNotification(`A new blog post has been created: "${anecdoteContent}"`)
    );
    setTimeout(() => dispatch(setNotification("")), 5000);
  };

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={handlingAddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button className="btn btn-primary btn-sm my-2" type="submit">
          Add New
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
