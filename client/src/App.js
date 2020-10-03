import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Collections } from "./pages/Collections/Collections";
import { BooksSearch } from "./pages/BooksSearch/BooksSearch";
import { Header } from "./components/Header";

const App = () => {
  const [books, setBooks] = useState({});

  const updateBooks = (page, data) => {
    // console.log("udapte", page);
    setBooks((prev) => {
      return {
        ...prev,
        [page]: data,
      };
    });
  };

  const clearBooks = () => {
    setBooks((prev) => {
      return {};
    });
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path="/search"
            render={(props) => (
              <BooksSearch
                {...props}
                books={books}
                clearBooks={clearBooks}
                updateBooks={updateBooks}
              />
            )}
          />
          <Route
            exact
            path="/collections"
            render={(props) => <Collections {...props} />}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <BooksSearch
                {...props}
                clearBooks={clearBooks}
                books={books}
                updateBooks={updateBooks}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
};

export default App;
