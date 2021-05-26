import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm.js";
import BlogForm from "./components/BlogForm.js";
import Togglable from "./components/Togglable.js";
import Notification from "./components/Notification.js";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      console.log(loggedUserJSON);
    }
  }, []);

  const toPage = (page) => (event) => {
    event.preventDefault();
    setPage(page);
  };

  const content = () => {
    if (page === "home") {
      return home();
    } else if (page === "blogposts") {
      return allPosts();
    } else if (page === "addblog") {
      return blogForm();
    }
  };
  const padding = {
    padding: 5,
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
    blogService.noToken();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage("a new blog has been added ");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in" cancleButtonLabel="Cancel">
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      </Togglable>
    );
  };

  const home = () => {
    return (
      <div className="row">
        <div className="col-12">
          <p>
            {" "}
            in this app there are plenty of useful blog posts that you can see
            and visit. You may add any useful blog post for others to see too if
            you wish!{" "}
          </p>
          {user === null ? loginForm() : null}
        </div>
      </div>
    );
  };

  const blogForm = () => {
    return (
      <div className="row">
        <div className="col-12">
          {user != null ? (
            <Togglable
              buttonLabel="Add Blog"
              cancleButtonLabel="Cancel"
              ref={blogFormRef}
            >
              <BlogForm createBlogPost={addBlog} />
            </Togglable>
          ) : (
            <div>
              <p>Please login first! </p> {loginForm()}
            </div>
          )}
        </div>
      </div>
    );
  };

  const allPosts = () => {
    {
      user != null ? (
        <div className="ml-auto text-light">
          {" "}
          {user.name} logged-in{" "}
          <button className="btn btn-danger btn-sm" onClick={handleLogOut}>
            {" "}
            Logout{" "}
          </button>
        </div>
      ) : null;
    }

    return (
      <div className="row">
        <div className="col-12">
          {user != null ? (
            blogs
              .sort((a, b) => {
                return b.likes - a.likes;
              })
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  addLike={handleLike}
                  deleteClickFuntion={handleDelete}
                  user={user}
                />
              ))
          ) : (
            <div>
              <p>Please login first! </p> {loginForm()}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    blogService
      .update(blog.id, updatedBlog)
      .then(
        setBlogs(
          blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        )
      );
  };

  const handleDelete = async (blog) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete blog post?"
    );
    const BlogToDelete = blog.id;
    if (confirmation) {
      await blogService.remove(BlogToDelete);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      setErrorMessage("post has been deleted");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Blog App
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              href=""
              onClick={toPage("home")}
              style={padding}
            >
              {" "}
              Home{" "}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href=""
              onClick={toPage("blogposts")}
              style={padding}
            >
              {" "}
              Posts{" "}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href=""
              onClick={toPage("addblog")}
              style={padding}
            >
              {" "}
              Add Post{" "}
            </a>
          </li>
        </ul>
        {user != null ? (
          <div className="ml-auto text-light">
            {" "}
            {user.name} logged-in{" "}
            <button className="btn btn-danger btn-sm" onClick={handleLogOut}>
              {" "}
              Logout{" "}
            </button>
          </div>
        ) : null}
      </nav>

      <div className="container">
        <div className="row mt-1">
          <div className="col-12 text-center">
            <Notification message={errorMessage} />
            <h2>Welcome to blog app!</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">{content()}</div>
        </div>

        {/* <div>
      <div>
        <a href="" onClick={toPage("home")} style={padding}>
          Home
        </a>
        <a href="" onClick={toPage("blogposts")} style={padding}>
          Posts
        </a>
        <a href="" onClick={toPage("addblog")} style={padding}>
          Add Post
        </a>
      </div>

      {content()}
    </div> */}

        {/* {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in{" "}
            <button className="btn btn-danger btn-sm" onClick={handleLogOut}>
              Logout
            </button>{" "}
          </p>
          <br />
          {blogForm()}
          {blogs
            .sort((a, b) => {
              return b.likes - a.likes;
            })
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={handleLike}
                deleteClickFuntion={handleDelete}
                user={user}
              />
            ))}
        </div>
      )} */}
      </div>

      <div className="jumbotron text-center mb-0 mt-1">
        <p>Blog app 2021 &copy; </p> 
      </div>
    </div>
  );
};

export default App;
