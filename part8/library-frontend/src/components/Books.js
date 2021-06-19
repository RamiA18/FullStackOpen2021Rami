import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const query = useQuery(ALL_BOOKS);
  const [bookList, setBookList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const handleFilterBooks = (genre) => {
    if (genre === "all") {
      setBookList(query.data.allBooks);
      return;
    }
    setBookList(
      query.data.allBooks.filter((book) => book.genres.includes(genre))
    );
  };

  useEffect(() => {
    if (query.data) {
      setBookList(query.data.allBooks);
    }
  }, [query.data]);

  useEffect(() => {
    if (query.data) {
      const genres = query.data.allBooks.flatMap((book) => book.genres);
      setGenreList([...new Set(genres)]);
    }
  }, [query.data, bookList]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2 className="mt-2">Books</h2>

      <div className="my-3">
        <h3>Select genre: </h3>
        <div className="btn-toolbar" role="toolbar">
        <div className="btn-group mr-2" role="group">

        {genreList.map((genre) => (
          <button className="btn btn-secondary" key={genre} onClick={() => handleFilterBooks(genre)}>
            {" "}
            {genre.toString().charAt(0).toUpperCase() + genre.toString().slice(1).toLowerCase()}{" "}
          </button>
        ))}
        <button className="btn btn-secondary" onClick={() => handleFilterBooks("all")}>All</button>
      </div>
      </div>
      </div>



      <table className="table table-bordered table-striped my-2">
        <tbody>
          <tr>
            <th scope="col">Book title</th>
            <th scope="col">Author</th>
            <th scope="col">Publish date</th>
          </tr>
          {bookList.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
