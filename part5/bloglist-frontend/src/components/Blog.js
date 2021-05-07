import React from "react";
import Togglable from "./Togglable.js";

const Blog = ({ blog, addLike, deleteClickFuntion, user }) => {
  const removeButton = () => {
    if (user && blog && blog.user.username) {
      if (blog.user.username === user.username) {
        return (
          <button
            className="btn btn-danger btn-sm mx-1"
            onClick={() => {
              deleteClickFuntion(blog);
            }}
          >
            {" "}
            Delete{" "}
          </button>
        );
      } else return null;
    } else return null;
  };

  return (
    <div className="card m-2">
      <div className="card-body">
        <h5>{blog.title}</h5>
        <Togglable buttonLabel="View Info" cancleButtonLabel="Hide">
          <p>
            <span style={{ fontWeight: "bold" }}>Author: </span>{" "}
            <span> {blog.author} </span>
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>likes: </span>{" "}
            <span> {blog.likes} </span>{" "}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                addLike(blog);
              }}
            >
              {" "}
              Like{" "}
            </button>
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>url: </span>{" "}
            <span> {blog.url} </span>
          </p>
          {removeButton()}
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
