import React, { useState } from "react";
import Books from "./components/Books.js";
import Recommendations from "./components/Recommendations.js";
import Authors from "./components/Authors.js";
import Login from "./components/Login.js";
import AddBookForm from "./components/AddBookForm.js";
import { useSubscription, useApolloClient } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faBook, faUserAlt, faPlus, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login")
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (dataInStore && !includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
    },
  });

  return (
  <div className="container mt-3">
    <div>
        <button className="btn btn-primary btn-sm mx-1" onClick={() => setPage("authors")}> <FontAwesomeIcon icon={faUserAlt} /> Authors</button>
        <button className="btn btn-primary btn-sm mx-1" onClick={() => setPage("books")}> <FontAwesomeIcon icon={faBook} /> Books</button>
        {token && (
          <>
            <button className="btn btn-primary btn-sm mx-1" onClick={() => setPage("add")}><FontAwesomeIcon icon={faPlus} /> Add book</button>
            <button className="btn btn-primary btn-sm mx-1" onClick={() => setPage("recommendations")}> <FontAwesomeIcon icon={faHeart} />  Recommend </button>
            <button className="btn btn-danger btn-sm mx-1" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} />Logout</button>
          </>
        )}
        {!token && <button className="btn btn-info text-white btn-sm mx-1" onClick={() => setPage("login")}><FontAwesomeIcon icon={faSignInAlt} /> Login </button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <AddBookForm show={page === "add"} updateCacheWith={updateCacheWith} redirect={setPage} />

      <Recommendations show={page === "recommendations"} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} redirect={setPage} />
    </div>
  );
};

export default App;
