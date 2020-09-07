import React from "react";
import Avatar from "@material-ui/core/Avatar";

import "./Book.css";
import noImage from "../../images/noimage.jpg";

const Book = ({ edition_key, publish_year, author }) => {
  return (
    <div className="book">
      <div className="book__header">
        <Avatar
          className="book__avatar"
          alt="avatar"
          src={
            edition_key
              ? `http://covers.openlibrary.org/b/olid/${edition_key}-M.jpg`
              : noImage
          }
        />
        <h4>
          {" "}
          <strong>author:</strong> {author}
        </h4>
      </div>
      <img
        className="book__image"
        src={
          edition_key
            ? `http://covers.openlibrary.org/b/olid/${edition_key}-M.jpg`
            : noImage
        }
        alt="book-cover"
      />
      <h4 className="book__publish_year">
        <strong> first publish year:</strong>
        {publish_year}
      </h4>
    </div>
  );
};

export default Book;
