import React from "react";
import useStyles from "./book_styles";
import { Alert, AlertTitle } from "@material-ui/lab";

import {
  Card,
  CardActions,
  CardMedia,
  Button,
  CardContent
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import ThumpUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Typography } from "@material-ui/core";
import moment from "moment";
import { checkout, deleteBook } from "../actions";
import { useSelector } from "react-redux";

// import { deletePost, likePost } from "../../../actions/posts";

const Book = ({ book, setCurrentId }) => {
  // const [isChecked, setIsChecked] = useDispatch(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.isLoggedIn);
  const borrows = useSelector((state) => state.borrow);
  const isBorrowed = borrows.find((el) => el.book_id === book.id);
  const borrowData = {
    book_id: book.id,
    user_id: user.id,
    date_borrow: new Date(),
    name: user.name,
    email: user.email,
    status: 1
  };
  const handleCheckout = () => {
    // setIsChecked(true);
    dispatch(checkout(borrowData));
  };
  function isAdmin() {
    if (user.email.trim() === "admin@library.com") return true;
    else return false;
  }
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={book.imageLink}
        title={book.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6"> {book.title}</Typography>
        <Typography variant="body1">
          Added: {moment(book.date_added).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {isAdmin() && (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(book.id)}
          >
            <Edit />
            Edit
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2">
          ISBN: {book.ISBN}, Publication year:{" "}
          {moment(book.published_date).format("YYYY")}
        </Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5">
          Author: {book.author}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Revision Number: {book.revision_number}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Publisher: {book.publisher}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Genre: {book.genre}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {!isBorrowed ? (
          <Button size="small" color="primary" onClick={handleCheckout}>
            <ThumpUpAltIcon fontSize="small" />
            Checkout
          </Button>
        ) : (
          <Alert severity="success" className="alert">
            <AlertTitle>Not available!</AlertTitle>
            <Typography variant="body2">
              Borrowed by {isBorrowed.name} on{" "}
              {moment(isBorrowed.date_borrow).format("d MMM, YYYY")}.
              <br />
              <Typography variant="body2" color="secondary">
                To be returned on{" "}
                {moment(addDays(isBorrowed.date_borrow, 10)).format(
                  "d MMM,YYYY"
                )}
              </Typography>
            </Typography>
          </Alert>
        )}
        {isAdmin() && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deleteBook(book.id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Book;
