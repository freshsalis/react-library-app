export const register = (user) => {
  return {
    type: "REGISTER",
    payload: user
  };
};
export const login = (user) => {
  return {
    type: "SIGN_IN",
    payload: user
  };
};
export const findUser = (user) => {
  return {
    type: "FIND",
    payload: user
  };
};
export const createBook = (book) => {
  return {
    type: "CREATE_BOOK",
    payload: book
  };
};
export const updateBook = (book, currentId) => {
  return {
    type: "UPDATE_BOOK",
    payload: { ...book, currentId: currentId }
  };
};
export const deleteBook = (currentId) => {
  return {
    type: "DELETE_BOOK",
    payload: currentId
  };
};
export const checkout = (data) => {
  return {
    type: "CHECKOUT",
    payload: data
  };
};

export const signout = () => {
  return {
    type: "SIGN_OUT"
  };
};
