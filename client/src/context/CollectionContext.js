import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const collectionContext = createContext();

const CollectionContextProvider = (props) => {
  const [collection, setCollection] = useState([
    { name: "Books I want to read", id: 1599576583554, books: [] },
    { name: "Books I read", id: 1599576585701, books: [] },
  ]);

  const addBook = (id, book, existsColl) => {
    const newColl = collection.map((col) => {
      if (col.id === id) {
        const exsistsBook = col.books.find((b) => b.key === book.key);
        if (!exsistsBook) {
          col.books = [...col.books, book];
          toast.success(`The book was added to ${col.name}`);
        }
      }
      return col;
    });

    // remove book when move book between collections
    if (existsColl) {
      removeBookFromAdd(existsColl, book.key);
    }
    setCollection(newColl);
  };

  const removeBookFromAdd = (col, key) => {
    col.books = col.books.filter((book) => book.key !== key);
  };

  const removeBook = (col, key) => {
    col.books = col.books.filter((book) => book.key !== key);
    setCollection([...collection]);
  };

  const addColection = (name) => {
    const col = {
      name: name,
      id: Date.now(),
      books: [],
    };
    setCollection([...collection, col]);
  };

  const removeColection = (id) => {
    const coll = collection.filter((c) => c.id !== id);
    setCollection(coll);
  };

  const editColection = (id, name) => {
    const newColl = collection.map((col) => {
      if (col.id === id) {
        col.name = name;
      }
      return col;
    });
    setCollection(newColl);
  };

  return (
    <collectionContext.Provider
      value={{
        collection,
        removeBook,
        addBook,
        removeColection,
        addColection,
        editColection,
      }}
    >
      {props.children}
    </collectionContext.Provider>
  );
};

export default CollectionContextProvider;
