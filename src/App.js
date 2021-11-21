import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppBar from "./components/AppBar/AppBar";
import { refreshUser } from "./redux/auth/auth-operations";
import { getIsLoggedIn, getIsRefresh } from "./redux/auth/auth-selectors";
import HomePage from "./pages/HomePage/HomePage";

import "./App.css";

function App() {
  const ContactsView = lazy(() =>
    import(
      "./pages/ContactsPage/ContactsPage" /* webpackChunkName: "contacts-page" */
    )
  );
  const RegisterView = lazy(() =>
    import(
      "./pages/RegisterPage/RegisterPage" /* webpackChunkName: "register-page" */
    )
  );
  const LoginView = lazy(() =>
    import("./pages/LoginPage/LoginPage" /* webpackChunkName: "login-page" */)
  );

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefresh = useSelector(getIsRefresh);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    !isRefresh && (
      <div className="App">
        <AppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/contacts"
            element={
              isLoggedIn ? (
                <Suspense fallback={null}>
                  <ContactsView />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/contacts" />
              ) : (
                <Suspense fallback={null}>
                  <RegisterView />
                </Suspense>
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/contacts" />
              ) : (
                <Suspense fallback={null}>
                  <LoginView />
                </Suspense>
              )
            }
          />
          <Route
            path="*"
            element={<h1 className="notFoundTitle">404 - "Page Not Found" </h1>}
          />
        </Routes>

        <Toaster
          position="top-center"
          reverseOrder={true}
          gutter={10}
          toastOptions={{
            className: "Toaster",
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            error: {
              duration: 5000,
            },
          }}
        />
      </div>
    )
  );
}

export default App;
