import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = (props) => {
  const [fetchAllBooks, allBooks] = useLazyQuery(ALL_BOOKS);
  const currentUser = useQuery(ME);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (currentUser.data && currentUser.data.me) {
      fetchAllBooks();
    }
  }, [currentUser.data, fetchAllBooks]);

  useEffect(() => {
    if (allBooks.data) {
      setBooks(allBooks.data.allBooks);
    }
  }, [allBooks.data, setBooks]);

  if (!props.show) return null;

  return (
    <div className="mt-2">
      <h2 className="mt-2"> Recommendation </h2>
      <p>Logged in as <b>{currentUser.data.me.username}</b> || Favorite genre <b>{currentUser.data.me.favoriteGenre.toString().charAt(0).toUpperCase() + currentUser.data.me.favoriteGenre.toString().slice(1).toLowerCase()}</b></p>
      <table className="table table-bordered table-striped my-3">
        <tbody>
          <tr>
            <th scope="col">Book</th>
            <th scope="col">Author</th>
            <th scope="col">Publish Date</th>
          </tr>
          {books
            .filter((book) =>
              book.genres.includes(currentUser.data.me.favoriteGenre)
            )
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;