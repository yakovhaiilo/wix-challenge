import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import "./BookSearch.css";
import Book from "../../components/Book/Book";
import Spiner from "../../components/Spiner/Spiner";
import PaginationOutlined from "../../components/Pagination/PaginationOutlined";
import RangeSlider from "../../components/Slider/RangeSlider";

//MuI
import { Container, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { ToastContainer } from "react-toastify";

// Building upon the first assignment, they should add a filter panel which lets filter
// the book list by author and by range of publication years.
// The author filter should be applied as you type
// (only when there are more than 2 chars in the filter) and the year range should be applied using a button.

export const BooksSearch = ({ books, updateBooks, clearBooks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalFound, setTotalFound] = useState(null);
  const [rangeYears, setRangeYears] = useState([500, 1500]);
  const [filterIsValid, setFilterIsValid] = useState(false);
  const mounted = useRef(true);
  const limit = 20;
  const pages = totalFound ? Math.ceil(totalFound / limit) : null;

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onPage = (p = 1) => {
    if (books[p]) {
      return setPage(p);
    }
    fatchBooks(p);
  };

  const onSearch = () => {
    if (!searchTerm) return;
    clearBooks();
    setPage(1);
    fatchBooks();
  };

  const fatchBooks = async (p = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://openlibrary.org/search.json?q=${searchTerm}&limit=${limit}&page=${p}`
      );
      if (mounted.current) {
        setPage(p);
        updateBooks(p, response.data.docs);
        setTotalFound(response.data.num_found);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (mounted.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const filterAuthorName = (book) => {
    let name = (book.author_name && book.author_name[0]) || "";
    return name.toUpperCase().includes(filterAuthor.toUpperCase());
  };
  const filterYearsRange = (book) => {
    return (
      book.publish_year > rangeYears[0] && book.publish_year < rangeYears[1]
    );
  };

  const setfilters = (book) => {
    if (filterAuthor.length > 2 && !filterIsValid) {
      return filterAuthorName(book);
    } else if (!(filterAuthor.length > 2) && filterIsValid) {
      return filterYearsRange(book);
    } else if (filterAuthor.length > 2 && filterIsValid) {
      return filterYearsRange(book) && filterAuthorName(book);
    } else {
      return true;
    }
  };
  return (
    <div className="booksSearch">
      <ToastContainer />
      <div className="booksSearch__form">
        <TextField
          id="standard-basic"
          label="filter autor name"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
        />

        <TextField
          id="standard-basic"
          label="search for a book"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          onClick={() => onSearch()}
          color="secondary"
        >
          search
        </Button>
        <RangeSlider setRangeYears={setRangeYears} rangeYears={rangeYears} />
        <div>
          <Button
            variant="contained"
            onClick={() => setFilterIsValid(!filterIsValid)}
            color="secondary"
          >
            {filterIsValid ? "Resat filter" : "Filter Years"}
          </Button>
        </div>
      </div>

      {pages && (
        <PaginationOutlined page={page} pages={pages} renderPage={onPage} />
      )}

      <Container>
        <Grid
          container
          direction="row-reverse"
          justify="center"
          alignItems="center"
        >
          {!isLoading ? (
            books[page] &&
            books[page]
              .filter(setfilters)
              .map((book, i) => <Book book={book} key={i} />)
          ) : (
            <Spiner />
          )}
        </Grid>
      </Container>
    </div>
  );
};
