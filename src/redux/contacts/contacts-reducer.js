import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactsRequest,
  addContactsSuccess,
  addContactsError,
  delContactsRequest,
  delContactsSuccess,
  delContactsError,
  filterContacts,
} from "./contacts-actions";

const itemsReducer = createReducer([], {
  [fetchContactsSuccess]: (_, { payload }) => payload.reverse(),
  [addContactsSuccess]: (state, { payload }) => [payload, ...state],
  [delContactsSuccess]: (state, { payload }) =>
    state.filter((item) => item.id !== payload),
});

const loadingReducer = createReducer(false, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,

  [addContactsRequest]: () => true,
  [addContactsSuccess]: () => false,
  [addContactsError]: () => false,

  [delContactsRequest]: () => true,
  [delContactsSuccess]: () => false,
  [delContactsError]: () => false,
});

const errorReducer = createReducer(null, {
  [fetchContactsError]: (_, { payload }) => payload.message,

  [addContactsError]: (_, { payload }) => payload.message,

  [delContactsError]: (_, { payload }) => payload.message,
});

const filterReducer = createReducer("", {
  [filterContacts]: (_, action) => action.payload,
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default contactsReducer;
