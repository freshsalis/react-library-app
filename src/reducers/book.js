import books_data from "../books_data";

const bookReducer = (books = books_data, action) => {
  switch (action.type) {
    case "CREATE_BOOK":
      return [...books, action.payload];

    case "UPDATE_BOOK":
      return books.map((book) =>
        book.id === action.payload.currentId ? action.payload : book
      );
    case "DELETE_BOOK":
      console.log("ok");

      return books.filter((book) => book.id !== action.payload);

    default:
      return books;
  }
};

export default bookReducer;
