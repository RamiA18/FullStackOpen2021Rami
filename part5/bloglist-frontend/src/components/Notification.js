import React from 'react'
const Notification = ({message}) => {
  if(!message) { return null } else { return(
  <div className="alert alert-info">
    {message}
  </div> 
  )
}
}
export default Notification