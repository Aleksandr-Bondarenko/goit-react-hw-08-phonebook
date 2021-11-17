import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppBar from "./components/AppBar/AppBar";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { refreshUser } from "./redux/auth/auth-operations";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div className="App">
      <AppBar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
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
