import React, { useState, useEffect } from "react";
import Book from "./Book";
import useStyles from "./catalog_styles";
import { useSelector } from "react-redux";
import { Grid, Typography, TextField } from "@material-ui/core";

const Catalog = ({ setCurrentId }) => {
  const existingBook = useSelector((state) => state.books);

  const [books, setBooks] = useState(existingBook);
  const [search, setSearch] = useState("");

  const classes = useStyles();

  const searchBook = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search);

    const searchItem = books.filter((b) => {
      return (
        b.title.trim().toLowerCase().includes(search.toLowerCase().trim()) ||
        b.ISBN.trim().toLowerCase().includes(search.toLowerCase().trim()) ||
        b.publisher.trim().toLowerCase().includes(search.toLowerCase().trim())
      );
    });
    // console.log(searchItem);
    if (search.trim().length <= 1) {
      setBooks(existingBook);
    }
    if (searchItem.length) {
      setBooks(searchItem);
    } else {
      setBooks(existingBook);
    }
  };
  useEffect(() => {
    if (search.trim().length === 0) {
      setBooks(existingBook);
    }
  }, [search, existingBook]);
  return (
    <>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={12}>
          <TextField
            name="search"
            variant="outlined"
            label="Search"
            fullWidth
            onKeyUp={searchBook}
          />
          <Typography variant="h2">Books</Typography>
        </Grid>
        {books.map((book) => (
          <Grid key={book.id} item xs={12} sm={6}>
            <Book book={book} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Catalog;
