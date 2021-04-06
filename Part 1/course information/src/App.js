import React from 'react'

  const App = () => {

    const Header = (props) => {
      return <h1>{props.course.name}</h1>
    }

      const Part = (props) => {
        return (
        <p> {props.name} {props.exercises} </p>
          )
    }

    const Content = ({parts}) => {
      return (
        <>
        <Part name={parts.parts[0].name} exercises={parts.parts[0].exercises} />
        <Part name={parts.parts[1].name} exercises={parts.parts[1].exercises} />
        <Part name={parts.parts[2].name} exercises={parts.parts[2].exercises} />
        </>
      )
  }

    const Total = ({parts}) => {
      const totalResult = parts.parts.reduce((total, value) => total = total + value.exercises, 0);
      return ( <p> {totalResult} </p>) 
}

    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
  
    return (
      <div>
        <Header course={course} />
        <Content parts={course} />
        <Total parts={course} />
      </div>
    )
  }

export default App