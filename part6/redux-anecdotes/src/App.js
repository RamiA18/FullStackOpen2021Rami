import React from "react";
import AnecdoteList from "./components/anecdoteList.js";
import AnecdoteForm from "./components/anecdoteForm.js";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
