import { v4 as uuidv4 } from "uuid";

const defaultUser = {
  _id: uuidv4(),
  role: 1,
  name: "admin",
  password: "1234",
  email: "admin@library.com"
};
const usersReducer = (users = [defaultUser], action) => {
  switch (action.type) {
    case "CREATE_USER":
      // console.log(action.payload);
      return [...users, action.payload];
    default:
      return users;
  }
};

export default usersReducer;
