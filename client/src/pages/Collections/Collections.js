import React, { useContext, useState } from "react";
import { collectionContext } from "../../context/CollectionContext";
import { Container, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Book from "../../components/book/Book";
import "./Collections.css";

export const Collections = () => {
  const [name, setName] = useState("");
  const [onEdit, setOnEdit] = useState({});
  const [newVal, setNewVal] = useState({});
  const context = useContext(collectionContext);

  const addColl = () => {
    if (!name) return;
    context.addColection(name);
    setName("");
  };

  const RemoveHandler = (id) => {
    context.removeColection(id);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewVal({ ...newVal, [name]: value });
  };

  const editHandler = (id) => {
    setOnEdit({ ...onEdit, [id]: true });
  };

  const saveColl = (id) => {
    setOnEdit({ ...onEdit, [id]: false });
    const name = newVal[id];
    if(!name) return;
    context.editColection(id, name);
  };
    
 
  return (
    <div className="collections">
      <div className="collections__form">
        <TextField
          id="standard-basic"
          label="collection name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" onClick={addColl} color="secondary">
          add collection
        </Button>
      </div>
      <div>
        {context.collection.map((coll, i) => {
          const btnIcon = onEdit[coll.id] ? <DoneIcon /> : <EditIcon />;
          const onCLick = onEdit[coll.id] ? saveColl : editHandler;
          return (
            <div key={i} className="collection__container">
              {!onEdit[coll.id] && <h2>{coll.name}</h2>}
              {onEdit[coll.id] && (
                <TextField
                  id="standard-basic"
                  label="collection name"
                  defaultValue={coll.name}
                  name={coll.id.toString()}
                  onChange={handleChange}
                />
              )}

              <IconButton
                value={coll.id}
                onClick={() => RemoveHandler(coll.id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton value={coll.id} onClick={() => onCLick(coll.id)}>
                {btnIcon}
              </IconButton>
              <div className="collections__items">
                <Container>
                  <Grid
                    container
                    direction="row-reverse"
                    justify="center"
                    alignItems="center"
                  >
                    {coll.books.map((book, j) => (
                        <Book book={book} collection={coll}  key={j} />
                    ))}
                  </Grid>
                </Container>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
