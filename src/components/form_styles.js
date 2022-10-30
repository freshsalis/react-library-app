import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse"
    }
  },
  alert: {
    marginTop: "50px"
  },
  paper: {
    padding: theme.spacing(2)
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  fileInput: {
    width: "97%",
    margin: "10px 0"
  },
  buttonSubmit: {
    marginBottom: 10
  }
}));
