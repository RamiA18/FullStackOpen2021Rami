import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { useField } from "./hooks";

let timeout;

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
    </div>
  );
};

const Notification = ({ notification }) => {
  if (!notification || notification === "") {
    return null;
  }
  return <div>{notification}</div>;
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdote }) => {
  // const id = useParams().id
  // const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>has {anecdote.votes} vote(s)</div>
      <div>
        for more information see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/RamiA18/FullStackOpen2021Rami/tree/main/part7/routed-anecdotes">
      https://github.com/RamiA18/FullStackOpen2021Rami/tree/main/part7/routed-anecdotes
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const history = useHistory();
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNew({
      content: content.attr.value,
      author: author.attr.value,
      info: info.attr.value,
      votes: 0,
    });
    history.push("/");
  };

  const handleResetForm = (event) => {
    event.preventDefault();
    content.resetValue();
    author.resetValue();
    info.resetValue();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.attr} />
        </div>
        <div>
          author
          <input {...author.attr} />
        </div>
        <div>
          url for more info
          <input {...info.attr} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleResetForm}>reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);
  const [notification, setNotification] = useState("");

  const match = useRouteMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find(
        (anecdote) => Number(anecdote.id) === Number(match.params.id)
      )
    : null;

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    if (timeout) {
      clearTimeout(timeout);
    }
    setNotification("A new post has been successfully added");
    timeout = setTimeout(() => setNotification(""), 10000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
