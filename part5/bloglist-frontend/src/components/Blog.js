import React from "react";
import Togglable from "./Togglable.js";

const Blog = ({ blog, addLike, deleteClickFuntion, user }) => {
  const removeButton = () => {
    if (user && blog && blog.user) {
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
        <h5 className="blogTitle">{blog.title}</h5>
        <p>
          <span style={{ fontWeight: "bold" }}>by </span>{" "}
          <span className="blogAuthor"> {blog.author} </span>
        </p>
        <Togglable
          className="blogDetails"
          buttonLabel="View Info"
          cancleButtonLabel="Hide"
        >
          {/* <p>
            <span style={{ fontWeight: "bold" }}>by </span>{" "}
            <span className="blogAuthor"> {blog.author} </span>
          </p> */}
          <p>
            <span style={{ fontWeight: "bold" }}>likes: </span>{" "}
            <span className="blogLikes"> {blog.likes} </span>{" "}
            <button
              className="likeButton btn btn-primary btn-sm"
              id="addLikeButton"
              onClick={() => {
                addLike(blog);
              }}
            >
              {" "}
              Add Like{" "}
            </button>
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>url: </span>{" "}
            <span className="blogUrl"> {blog.url} </span>
          </p>
          {removeButton()}
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
