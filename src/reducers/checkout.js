const borrowReducer = (state = [], action) => {
  switch (action.type) {
    case "CHECKOUT":
      // const user =
      return [...state, action.payload];

    default:
      return state;
  }
};

export default borrowReducer;
