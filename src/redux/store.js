import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import logger from "redux-logger";
import contactsReducer from "./contacts/contacts-reducer";
import authReducer from "./auth/auth-reducer";
import storage from "redux-persist/lib/storage";

const getMiddleware = (getDefaultMiddleware) =>
  process.env.NODE_ENV === "development"
    ? // process.env.NODE_ENV === "production"
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(logger)
    : getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });

const tokenPersistConfig = {
  key: "user-token",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: persistReducer(tokenPersistConfig, authReducer),
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: getMiddleware,
});

export const persistor = persistStore(store);
