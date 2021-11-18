import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppBar from "./components/AppBar/AppBar";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { refreshUser } from "./redux/auth/auth-operations";
import { getIsLoggedIn } from "./redux/auth/auth-selectors";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div className="App">
      <AppBar />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route
          path="/contacts"
          element={isLoggedIn ? <ContactsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/contacts" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/contacts" /> : <LoginPage />}
        />
        <Route path="*" element={<h2>Not Found Page</h2>} />
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={10}
        toastOptions={{
          className: "Toaster",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
