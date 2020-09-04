import React, { useState } from "react";
import { getBookCoverByOLID, searchBooks } from "../../BooksApi/index";
import axios from 'axios';

export const BooksSearch = () => {
  const [searchTerm ,setSearchTerm] = useState("");
  const [books,setBooks] = useState([])
  const handleChenge = event => {
     setSearchTerm(event.target.value);
  }
  const search = () => {
     axios.get(`http://openlibrary.org/search.json?q=${searchTerm}`
       
     ).then((response) => {
       console.log(response.data.docs)
      setBooks(response.data.docs)
     })
  }
  return (
    <div>
      <h1>Search books</h1>
        <input onChange={handleChenge} value={searchTerm} name='search' placeholder='search a book' />
        <button onClick={search}>search</button>
      <br />
       {JSON.stringify(searchTerm)}
       <br />
       {JSON.stringify(books)}
    </div>
  );
};
