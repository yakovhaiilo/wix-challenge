import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";

import "./BookSearch.css";
import { BooksContext } from "../../context/BooksContext";

// components
import TextFields from "../../components/TextFields/TextFields";
import Spiner from "../../components/Spiner/Spiner";
import PaginationOutlined from "../../components/Pagination/PaginationOutlined";
import FilterBar from "../../components/FilterBar/FilterBar";
import BooksList from "../../components/BooksList/BooksList";

export const BooksSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [yearsRange, setYearsRange] = useState([500, 1500]);
  const [filterIsValid, setFilterIsValid] = useState(false);
  const {
    books,
    updateBooks,
    clearBooks,
    totalFound,
    setTotalFound,
  } = useContext(BooksContext);
  const mounted = useRef(true);
  const limit = 20;
  const pages = totalFound ? Math.ceil(totalFound / limit) : null;

  const onPage = (p = 1) => {
    console.log("onpage", p);
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

  const filterAuthorName = (book) => {
    let name = (book.author_name && book.author_name[0]) || "";
    return name.toUpperCase().includes(filterAuthor.toUpperCase());
  };
  const filterYearsRange = (book) => {
    return (
      book.publish_year >= yearsRange[0] && book.publish_year <= yearsRange[1]
    );
  };

  const setfilters = (book) => {
    let authorFilter = filterIsValid ? filterYearsRange(book) : true;
    let yeasrsFilter = filterAuthor.length > 2 ? filterAuthorName(book) : true;
    return authorFilter && yeasrsFilter;
  };

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  // console.log("b", books);
  // console.log("b", page, pages);
  return (
    <div className="booksSearch">
      <div className="booksSearch__TextFields">
        <TextFields
          onSubmit={onSearch}
          setValue={setSearchTerm}
          value={searchTerm}
          btnText={"Search"}
          label={"search for a book"}
        />
      </div>
      <div className="booksSearch__filterBar">
        <FilterBar
          setYearsRange={setYearsRange}
          yearsRange={yearsRange}
          filterIsValid={filterIsValid}
          setFilterIsValid={setFilterIsValid}
          filterAuthor={filterAuthor}
          setFilterAuthor={setFilterAuthor}
        />
      </div>
      <div className="booksSearch__Pagination">
        <PaginationOutlined page={page} pages={pages} renderPage={onPage} />
      </div>

      {!isLoading && <BooksList books={books[page]} boolean={setfilters} />}
      {isLoading && <Spiner />}
    </div>
  );
};
