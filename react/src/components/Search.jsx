import React, { useState } from 'react';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_SOCKS_API_URL}/search`, {
      method: "POST",
      body: JSON.stringify({ searchTerm }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        props.setData(data)
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit} >
      <input className="form-control me-2" type="search"
        placeholder="Search" aria-label="Search"
        value={searchTerm} onChange={handleChange} />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  )
}

export default Search;