import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import { Container, Grid } from "@material-ui/core";
import Book from "../../components/book/Book";
import Spiner from "../../components/spiner/Spiner";
import "./BookSearch.css";

export const BooksSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const fatchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://openlibrary.org/search.json?q=${searchTerm}&limit=20&offset=0&page=1`
      );
      setBooks(response.data.docs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  // console.log(books);
  return (
    <div className="booksSearch">
      <div className="booksSearch__box">
        <input
          value={searchTerm}
          type="text"
          onChange={handleChange}
          placeholder="search for a book"
          className="booksSearch__txt"
        />
        <button onClick={fatchBooks}>search</button>
      </div>
      <Container>
        <Grid
          container
          direction="row-reverse"
          justify="center"
          alignItems="center"
        >
          {!isLoading ? (
            books.map((book, i) => (
              <div key={uuidv4()}>
                <Book
                  id={uuidv4()}
                  edition_key={book.cover_edition_key}
                  publish_year={book.first_publish_year}
                  author={book.author_name}
                  book={book}
                />
              </div>
            ))
          ) : (
            <Spiner />
          )}
        </Grid>
      </Container>
    </div>
  );
};
