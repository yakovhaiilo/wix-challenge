import React, { useState } from "react";
import axios from "axios";

import "./BookSearch.css";

//MuI
import { Container, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Book from "../../components/book/Book";
import Spiner from "../../components/spiner/Spiner";

export const BooksSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fatchBooks = async () => {
    if(!searchTerm) return;
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

  return (
    <div className="booksSearch">
      <div className="booksSearch__form">
        <TextField
          id="standard-basic"
          label="search for a book"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={fatchBooks} color="secondary">
          search
        </Button>
      </div>

      <Container>
        <Grid
          container
          direction="row-reverse"
          justify="center"
          alignItems="center"
        >
          {!isLoading ? (
            books.map((book, i) => <Book book={book} key={i} />)
          ) : (
            <Spiner />
          )}
        </Grid>
      </Container>
    </div>
  );
};
