import "./styles.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
export default function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={isLoggedIn.status ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/"
          element={
            !isLoggedIn.status ? <Navigate to="/auth" replace /> : <Home />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
