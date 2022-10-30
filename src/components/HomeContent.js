import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Container, Grid, Grow } from "@material-ui/core";
import Form from "./BookForm";
import Catalog from "./Catalog";
import { useSelector } from "react-redux";
import useStyles from "./form_styles";

const HomeContent = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.isLoggedIn);

  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: "ALL_BOOKS" });
  }, [dispatch]);
  function isAdmin() {
    if (user.email.trim() === "admin@library.com") return true;
    else return false;
  }
  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={isAdmin() ? 7 : 12}>
            <Catalog setCurrentId={setCurrentId} />
          </Grid>
          {isAdmin() && (
            <Grid item xs={12} sm={3}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Grow>
  );
};

export default HomeContent;
