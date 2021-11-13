import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import contactsReducer from "./contacts/contacts-reducer";

const getMiddleware = (getDefaultMiddleware) =>
  process.env.NODE_ENV === "development"
    ? getDefaultMiddleware().concat(logger)
    : getDefaultMiddleware();

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: getMiddleware,
});

export default store;
