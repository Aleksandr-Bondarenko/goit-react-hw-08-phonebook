// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";

import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import contactsReducer from "./contacts/contacts-reducer";

// const rootReducer = combineReducers({
//   contacts: contactsReducer,
// });

const getMiddleware = (getDefaultMiddleware) =>
  process.env.NODE_ENV === "development"
    ? getDefaultMiddleware().concat(logger)
    : getDefaultMiddleware();

const preloadedState = {
  contacts: {
    items: JSON.parse(localStorage.getItem("contacts")) ?? [],
    filter: "",
  },
};

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: getMiddleware,
  preloadedState,
});

// const store = createStore(
//   rootReducer,
//   preloadedState,
//   composeWithDevTools(applyMiddleware(logger))
// );

export default store;
