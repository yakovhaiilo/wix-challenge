import React from "react";
import { Switch, Route } from "react-router-dom";
import { Collections } from "./pages/Collections/Collections";
import { BooksSearch } from "./pages/BooksSearch/BooksSearch";
import { Header } from "./components/Header";
import CollectionContextProvider from './context/CollectionContext';

const App = () => {
  return (
    <div className="app">
    <CollectionContextProvider>
      <Header />
      <main>
        <Switch>
          <Route exact path="/search" render={(props) => (<BooksSearch {...props} />)}/>
          <Route exac path="/collections"render={(props) => (<Collections {...props}/>)}/>
          <Route path="/" render={(props) => (<BooksSearch {...props}/>)}/>
        </Switch>
      </main>
      </CollectionContextProvider>
    </div>
  );
}

export default App;
