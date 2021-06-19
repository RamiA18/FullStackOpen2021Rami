import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, CREATE_BOOK } from "../queries";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddBookForm = ({ show, updateCacheWith, redirect }) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (store, res) => {
      updateCacheWith(res.data.createBook);
    },
    onError: (error) => {
      window.alert(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      redirect("books")
    }
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: { title, author, published: Number(published), genres },
    });
    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div className="mt-2">
      <form onSubmit={submit}>
        <div className="mt-2">
          Title: 
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="mt-2">
          Author: 
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div className="mt-2">
          Publish Date: 
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className="mt-2">
          Genres: 
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button className="btn btn-info text-white btn-sm mx-1" onClick={addGenre} type="button">
          <FontAwesomeIcon icon={faPlus} /> 
          Add genre
          </button>
        </div>
        <div className="mt-2">Genres: {genres.join(" ")}</div>
        <button className="btn btn-primary btn-sm mx-1 mt-2" type="submit"> <FontAwesomeIcon icon={faPlus} /> Add book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
