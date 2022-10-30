import bookReducer from "./book";
import loggedReducer from "./isLoggedIn";
import users from "./users";
import borrowReducer from "./checkout";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  books: bookReducer,
  isLoggedIn: loggedReducer,
  users,
  borrow: borrowReducer
});

export default allReducers;
