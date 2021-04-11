import React, { useState } from "react";

const Title = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p style={{ fontWeight: "bold" }}>has {props.votes} votes</p>
    </div>
  );
};

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}> {props.text} </button>
    </div>
  );
};

const HighestVoted = (props) => {
  const { anecdotes, votes } = props;
  const highestVoted = votes.indexOf(Math.max(...votes));
  console.log(highestVoted);
  return (
    <Anecdote anecdote={anecdotes[highestVoted]} votes={votes[highestVoted]} />
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getNewAnecdotes = () => {
    const min = 0;
    const max = anecdotes.length;
    const random = Math.floor(min + Math.random() * (max - min));
    setSelected(random);
  };

  const voteHandle = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;

    setVotes(newVotes);
  };

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={getNewAnecdotes} text="get a new anecdotes" />
      <Button handleClick={voteHandle} text="Vote +1" />
      <Title text="Anecdote with most votes" />
      <HighestVoted anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
