const loggedInReducer = (
  state = { id: null, status: false, role: 2, email: "", name: "" },
  action
) => {
  switch (action.type) {
    case "SIGN_IN":
      // const user =
      return {
        id: action.payload._id,
        status: true,
        name: action.payload.name,
        email: action.payload.email
      };
    case "SIGN_OUT":
      return { role: 2 };
    default:
      return state;
  }
};

export default loggedInReducer;
