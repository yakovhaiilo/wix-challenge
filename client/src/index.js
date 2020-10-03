import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import CollectionContextProvider from "./context/CollectionContext";

ReactDOM.render(
  <Router>
    <CollectionContextProvider>
      <App />
    </CollectionContextProvider>
  </Router>,
  document.getElementById("root")
);
