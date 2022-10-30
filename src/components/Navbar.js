import { useDispatch } from "react-redux";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { signout } from "../actions";
import useStyles from "./navbar_styles";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const classes = useStyles();

  const user = isLoggedIn;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Library
        </Typography>
      </div>
      {location.pathname !== "/auth" && (
        <Toolbar className={classes.toolbar}>
          {isLoggedIn.status ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.name}
                // src={user.imageUrl}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography className={classes.username} variant="h6">
                {user.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={() => dispatch(signout())}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Navbar;
