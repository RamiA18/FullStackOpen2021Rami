import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Authors = (props) => {
  const [authors, setAuthors] = useState([]);
  const result = useQuery(ALL_AUTHORS);
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (result.data && result.data.allAuthors) {
      setAuthors(result.data.allAuthors);
    }
  }, [setAuthors, result]);

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: selectedOption.value, setBornTo: Number(born) },
    });
    setSelectedOption(null);
    setBorn("");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2 className="mt-3">Authors</h2>
      <table className="table table-bordered table-striped my-3">
        <tbody>
          <tr>
            <th scope="col">Author Name</th>
            <th scope="col">Birthyear</th>
            <th scope="col">Number of books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

<div className="my-4">
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={authors.map((author) => ({
            value: author.name,
            label: author.name,
          }))}
        />
        <div className="my-2">
          <span>Birthyear: </span>
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            type="text"
          />
        </div>
        <button className="btn btn-success btn-sm mx-1" type="submit"> <FontAwesomeIcon icon={faEdit} /> Update author</button>
      </form>
      </div>
    </div>
  );
};

export default Authors;