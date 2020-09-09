import React, { useContext } from "react";
import { collectionContext } from "../../context/CollectionContext";

import noImage from "../../images/noimage.jpg";
import useStyles from "./useStyle";

// MuI

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const Book = ({ book, collection }) => {
  const { first_publish_year, author_name, cover_edition_key } = book;
  const classes = useStyles();
  const context = useContext(collectionContext);

  function onAdd(e) {
    const colId = e.target.value;
    if (!colId) return;
    context.addBook(colId, book, collection);
  }

  return (
    <div className="book">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={
                cover_edition_key
                  ? `http://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg`
                  : noImage
              }
            />
          }
          title={`Publish year : ${first_publish_year}`}
        />
        <div className="book__action">
        {collection && (
          <IconButton  onClick={() => {
            context.removeBook(collection.id, book.key);
          }} >
               <DeleteIcon />
          </IconButton>
        )}
   

        <InputLabel htmlFor="grouped-select">collection</InputLabel>
          <Select defaultValue="" id="grouped-select" onChange={onAdd} >
          {!collection && <MenuItem value=""><em>Select collection</em></MenuItem>}
          {collection && <MenuItem value=""><em>Transfer to</em></MenuItem>}
          {context.collection.map((c) => {
            return (
              <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
            );
          })}  
        </Select>
        </div>
     
        <CardMedia
          className={classes.media}
          image={
            cover_edition_key
              ? `http://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg`
              : noImage
          }
          title="cover"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Author : ${author_name}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Book;
