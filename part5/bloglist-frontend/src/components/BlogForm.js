import React, { useState } from "react";

const BlogForm = ({ createBlogPost }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlogPost({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <form onSubmit={addBlog}>
        <div className="m-1">
          Title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div className="m-1">
          Author:
          <input
            type="text"
            value={author}
            name="title"
            onChange={handleAuthorChange}
          />
        </div>
        <div className="m-1">
          URL:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button className="btn btn-primary btn-sm m-1" type="submit">
          save
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
