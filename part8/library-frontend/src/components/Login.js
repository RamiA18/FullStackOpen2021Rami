import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Login = ({ show, setToken, redirect }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error(error);
      window.alert(error);
    },
    onCompleted: () => {
      redirect("books")
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [setToken, result.data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-2">
        <span>Username: </span>
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          type="text"
        />
      </div>
      <div className="my-2">
        <span>Password: </span>
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </div>
      <button className="btn btn-primary text-white btn-sm mx-1" type="submit"> <FontAwesomeIcon icon={faSignInAlt} /> Login</button>
    </form>
  );
};

export default Login;
