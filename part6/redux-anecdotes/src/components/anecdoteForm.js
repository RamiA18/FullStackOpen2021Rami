import React from "react";
import anecdoteService from "../services/anecdotes";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { createAnecdoteAction } from "../reducers/anecdoteReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";

// const AnecdoteForm = () => {
const AnecdoteForm = ({ createAnecdoteAction, setNotification }) => {
  const handlingAddAnecdote = async (event) => {
    event.preventDefault();
    const anecdoteContent = event.target.anecdote.value;

    createAnecdoteAction(anecdoteContent);
    setNotification(`A new blog post has been created: ${anecdoteContent}`, 5);
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

const mapDispatchToProps = {
  createAnecdoteAction,
  setNotification,
};

const anecdoteFormConnected = connect(null, mapDispatchToProps)(AnecdoteForm);

export default anecdoteFormConnected;
