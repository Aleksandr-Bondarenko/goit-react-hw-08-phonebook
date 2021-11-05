import { createReducer, combineReducers } from "@reduxjs/toolkit";
import * as actions from "./contacts-actions";
// import { combineReducers } from "redux";
// import actionTypes from "./contacts-types";

// Option with use "Map Object Notation"
const itemsReducer = createReducer([], {
  [actions.add]: (state, action) => [action.payload, ...state],
  [actions.del]: (state, action) =>
    state.filter((item) => item.id !== action.payload),
});

const filterReducer = createReducer("", {
  [actions.filter]: (_, action) => action.payload,
});

// Option with use "Builder Callback Notation"

// const itemsReducer = createReducer([], (builder) => {
//   builder
//     .addCase(actions.add, (state, action) => [action.payload, ...state])
//     .addCase(actions.del, (state, action) =>
//       state.filter((item) => item.id !== action.payload)
//     );
// });

// const filterReducer = createReducer("", (builder) => {
//   builder
//   .addCase(actions.filter, (state, action) => (action.payload))
// });

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

export default contactsReducer;

// Create reducers with use Vanilla Redux (without Redux Toolkit)
// const itemsReducer = (state = [], { type, payload }) => {
//   switch (type) {
//     case actionTypes.ADD:
//       return [payload, ...state];

//     case actionTypes.DEL:
//       return state.filter((item) => item.id !== payload);

//     default:
//       return state;
//   }
// };

// const filterReducer = (state = "", { type, payload }) => {
//   switch (type) {
//     case actionTypes.FILTER:
//       return payload;

//     default:
//       return state;
//   }
// };
