import React from 'react'
import Part from './Part.js'
import Sum from './Sum.js'


const Content = ({courseParts}) => {
    return (
      <div>
        <Part name={courseParts[0].name} exercises={courseParts[0].exercises} />
        <Part name={courseParts[1].name} exercises={courseParts[1].exercises} />
        <Part name={courseParts[2].name} exercises={courseParts[2].exercises} />
        <Sum coursePartsExercises={courseParts} />
      </div>
    )
  }

  export default Content