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
    }
  }, []);

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

  const blogForm = () => {
    return (
      <Togglable
        buttonLabel="Add Blog"
        cancleButtonLabel="Cancel"
        ref={blogFormRef}
      >
        <BlogForm createBlogPost={addBlog} />
      </Togglable>
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
    <div className="container">
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null ? (
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
      )}
    </div>
  );
};

export default App;
