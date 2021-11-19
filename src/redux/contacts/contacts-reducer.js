import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  filterContacts,
  modalVisible,
  modalEditableData,
} from "./contacts-actions";
import {
  fetchContacts,
  addContacts,
  delContacts,
  editContacts,
} from "./contacts-operations";

const itemsReducer = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload.reverse(),
  [addContacts.fulfilled]: (state, { payload }) => [payload, ...state],
  [delContacts.fulfilled]: (state, action) =>
    state.filter((item) => item.id !== action.payload),

  [editContacts.fulfilled]: (state, { payload }) =>
    state.map((item) => (item.id === payload.id ? payload : item)),
});

const loadingReducer = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,

  [addContacts.pending]: () => true,
  [addContacts.fulfilled]: () => false,
  [addContacts.rejected]: () => false,

  [delContacts.pending]: () => true,
  [delContacts.fulfilled]: () => false,
  [delContacts.rejected]: () => false,

  [editContacts.pending]: () => true,
  [editContacts.fulfilled]: () => false,
  [editContacts.rejected]: () => false,
});

const errorReducer = createReducer(null, {
  [fetchContacts.rejected]: (_, { payload }) => payload.message,
  [fetchContacts.pending]: () => null,

  [addContacts.rejected]: (_, { payload }) => payload.message,
  [addContacts.pending]: () => null,

  [delContacts.rejected]: (_, { payload }) => payload.message,
  [delContacts.pending]: () => null,
});

const filterReducer = createReducer("", {
  [filterContacts]: (_, action) => action.payload,
});

const isShowReducer = createReducer(false, {
  [modalVisible]: (_, action) => action.payload,
});

const editableDataReducer = createReducer(
  {},
  {
    [modalEditableData]: (_, action) => action.payload,
  }
);

const modalReducer = combineReducers({
  isShow: isShowReducer,
  editableData: editableDataReducer,
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  modal: modalReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default contactsReducer;
