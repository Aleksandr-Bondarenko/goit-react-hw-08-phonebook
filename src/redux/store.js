import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import contactsReducer from "./contacts/contacts-reducer";

const getMiddleware = (getDefaultMiddleware) =>
  process.env.NODE_ENV === "development"
    ? getDefaultMiddleware().concat(logger)
    : getDefaultMiddleware();

// const preloadedState = {
//   contacts: {
//     items: JSON.parse(localStorage.getItem("contacts")) ?? [],
//     filter: "",
//   },
// };

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: getMiddleware,
  // preloadedState,
});

export default store;
