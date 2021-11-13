import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { filterContacts } from "./contacts-actions";
import { fetchContacts, addContacts, delContacts } from "./contacts-operations";

const itemsReducer = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload.reverse(),
  [addContacts.fulfilled]: (state, { payload }) => [payload, ...state],
  [delContacts.fulfilled]: (state, action) =>
    state.filter((item) => item.id !== action.meta.arg.id),
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

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default contactsReducer;

// const contactsSlice = createSlice({
//   name: "contacts",

//   initialState: {
//     items: [],
//     filter: "",
//     loading: false,
//     error: null,
//   },

//   reducers: {
//     [filterContacts]: (state, action) => (state.filter = action.payload),
//   },

//   extraReducers: {
//     [fetchContacts.fulfilled]: (state, { payload }) => {
//       state.items.push(...payload);
//       state.loading = false;
//     },
//     [fetchContacts.pending]: (state, _) => (state.loading = true),
//     [fetchContacts.rejected]: (state, _) => (state.loading = false),
//   },
// });

// export default contactsSlice.reducer;
