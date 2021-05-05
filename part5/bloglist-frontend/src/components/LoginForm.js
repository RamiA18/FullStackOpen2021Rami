import React from 'react'

const LoginForm = (props) => {
   return (
     <div>
       <h2>Login</h2>
 
       <form onSubmit={props.handleSubmit}>
         <div>
           username
          <input
          type="text"
          value={props.username}
          name="Username"
          onChange={props.handleUsernameChange}
          />
         </div>
         <div>
           password
           <input
             type="password"
             value={props.password}
             onChange={props.handlePasswordChange}
           />
       </div>
         <button className= "btn btn-primary btn-sm" type="submit">login</button>
       </form>
     </div>
   )
 }

export default LoginForm


