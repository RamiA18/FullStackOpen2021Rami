import React from "react";
import AnecdoteList from "./components/anecdoteList.js";
import AnecdoteForm from "./components/anecdoteForm.js";
import Notification from "./components/Notification.js";
import Filter from "./components/Filter.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Anecdotes</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Notification />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Filter />
        </div>
      </div>
      <AnecdoteList />
      <div className="row">
        <div className="col">
          <hr />
          <AnecdoteForm />
        </div>
      </div>
    </div>
  );
};

export default App;
