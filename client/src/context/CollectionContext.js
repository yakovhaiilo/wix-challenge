import React, { createContext, useState } from "react";

export const collectionContext = createContext();

const CollectionContextProvider = (props) => {
  const [collection, setCollection] = useState([]);

  const addBook = (id, book) => {
      console.log('addbok',id,book);
    const newColl = collection.map((col) => {
      if (col.id === Number(id)) {
        col.books.push(book);
      }
      return col;
    });
    setCollection(newColl);
  }
  const removeBook = (id, key) => {
      console.log('removeBook' ,id,key)
    const newColl = collection.map((col) => {
      if (col.id === id) {
        col.books = col.books.filter((book) => book.key !== key);
      }
      return col;
    });
    setCollection(newColl);
  }

  const addColection = (name) => {
      console.log('addColection', name)
    const col = {
      name: name,
      id: Date.now(),
      books: [],
    };
    setCollection([...collection, col]);
  }
  const removeColection = (id) => {
      console.log('removeColection',id)
    const coll = collection.filter((c) => c.id !== id);
    setCollection(coll);
  }
  const editColection = (id, name) => {
    console.log('editColection',id,name)
    const newColl = collection.map((col) => {
      if (col.id == id) {
        col.name = name;
      }
      return col;
    });
  }
  console.log('context',collection);
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
