import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import FileBase from "react-file-base64";
import useStyles from "./form_styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createBook, updateBook } from "../actions";

const BookForm = ({ currentId, setCurrentId }) => {
  const [bookData, setBookData] = useState({
    id: uuidv4(),
    author: "Unknown",
    date_added: new Date("2022-10-20"),
    imageLink: "",
    title: "",
    pages: "",
    published_date: "",
    ISBN: "",
    revision_number: "",
    publisher: "",
    genre: ""
  });
  const classes = useStyles();
  const book = useSelector((state) =>
    currentId ? state.books.find((b) => b.id === currentId) : null
  );
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (book) setBookData(book);
  }, [book]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateBook(bookData, currentId));
    } else {
      dispatch(createBook(bookData));
      setStatus(true);
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a book</Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={bookData.title}
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
        />
        <TextField
          name="isbn"
          variant="outlined"
          label="ISBN"
          fullWidth
          value={bookData.ISBN}
          onChange={(e) => setBookData({ ...bookData, ISBN: e.target.value })}
        />
        <TextField
          name="revision_number"
          variant="outlined"
          label="Revision Number"
          fullWidth
          value={bookData.revision_number}
          onChange={(e) =>
            setBookData({ ...bookData, revision_number: e.target.value })
          }
        />
        <TextField
          name="published_date"
          variant="outlined"
          label="Published Data"
          fullWidth
          value={bookData.tags}
          type="date"
          onChange={(e) =>
            setBookData({
              ...bookData,
              published_date: e.target.value.split(",")
            })
          }
        />
        <div className={classes.fileInput}>
          Cover Image:
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setBookData({ ...bookData, imageLink: base64 })
            }
          />
        </div>
        <TextField
          name="publisher"
          variant="outlined"
          label="Publisher"
          fullWidth
          value={bookData.publisher}
          onChange={(e) =>
            setBookData({ ...bookData, publisher: e.target.value })
          }
        />
        <TextField
          name="author"
          variant="outlined"
          label="Author(s)"
          fullWidth
          value={bookData.author}
          onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
        />
        <TextField
          name="genre"
          variant="outlined"
          label="Genre"
          fullWidth
          value={bookData.genre}
          onChange={(e) => setBookData({ ...bookData, genre: e.target.value })}
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>

        {status && (
          <Alert severity="success" className="alert">
            <AlertTitle>Success</AlertTitle>
            Book added successfully<strong>!</strong>
          </Alert>
        )}
      </form>
    </Paper>
  );
};

export default BookForm;
