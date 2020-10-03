import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationOutlined({ pages, page, renderPage }) {
  const classes = useStyles();
  const handleChange = (event, value) => {
    renderPage(value);
  };
  return (
    <div className={classes.root}>
      <Pagination
        count={pages}
        page={page}
        onChange={handleChange}
        variant="outlined"
        color="secondary"
      />
    </div>
  );
}
