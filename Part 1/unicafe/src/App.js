import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}> {props.text} </button>
  )
}

const Statistic = (props) => {
  return (
    <div>
      <p> {props.ratingGrade}: {props.rating} </p>
    </div>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  const average = ((good * 1) + (neutral * 0) + (bad * -1)/all).toFixed(2)
  const postiveFeedback = ((good/all)*100).toFixed(1) + "%"
  
  if (all > 0) { 
    return (
    <div>
    <Statistic ratingGrade="good" rating={good} />
    <Statistic ratingGrade="neutral" rating={neutral} />
    <Statistic ratingGrade="bad" rating={bad} />
    <Statistic ratingGrade="all" rating={all} />
    <Statistic ratingGrade="Average" rating={average} />
    <Statistic ratingGrade="Positive Feedbacks" rating={postiveFeedback} />
    </div>
  ) } 
  return (<div> No statistics given </div>)
}

const Title = ({text}) => {
  return (
    <h1> {text} </h1>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)

  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <Title text="Give a feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Title text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />


    </div>
  )
}

export default App