import React, { useEffect, useState } from "react";
import useStyles from "./auth_styles";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";

import {
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,
  Button
} from "@material-ui/core";
import CustomInput from "./CustomInput";
import Navbar from "./Navbar";
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const users = useSelector((state) => state.users);
  // const isLoggedIn = useSelector((state) => state.loggedReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      const newUser = { ...user, _id: uuidv4() };
      dispatch({ type: "CREATE_USER", payload: newUser });
      setStatus(true);
      setisSignUp(false);
    } else {
      const checkLogin = users.find(
        (u) => u.email === user.email && u.password === user.password
      );
      if (checkLogin) {
        setStatus(true);
        dispatch({
          type: "SIGN_IN",
          payload: {
            id: checkLogin.id,
            role: checkLogin.role,
            name: checkLogin.name,
            email: checkLogin.email
          }
        });
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser((prevUser) => {
      return {
        ...prevUser,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    setisSignUp((prevState) => !prevState);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Navbar />
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon/>   */}
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <CustomInput
                  name="name"
                  type=""
                  label="Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <CustomInput
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <CustomInput
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <CustomInput
                name="confirmPassword"
                label="Repeat Password"
                handlechange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justifyContent="flex-end">
            <Button onClick={switchMode}>
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account"}
            </Button>
          </Grid>
          {status && (
            <Alert severity="success" className="alert">
              <AlertTitle>Success</AlertTitle>
              Account created successfully<strong>!</strong>
            </Alert>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
