import React, { createContext, useState } from "react";

export const collectionContext = createContext();

const CollectionContextProvider = (props) => {
  const [collection, setCollection] = useState([
    { name: "Books I want to read", id: 1599576583554, books: [] },
    { name: "Books I read", id: 1599576585701, books: [] },
  ]);

  const addBook = (id, book, existsColl) => {
    const newColl = collection.map((col) => {
      if (col.id === Number(id)) {
        col.books.push(book);
      }
      return col;
    });
    setCollection(newColl);
    if (existsColl) {
      removeBook(existsColl.id, book.key);
    }
  };
  const removeBook = (id, key) => {
    const newColl = collection.map((col) => {
      if (col.id === id) {
        col.books = col.books.filter((book) => book.key !== key);
      }
      return col;
    });
    setCollection(newColl);
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
