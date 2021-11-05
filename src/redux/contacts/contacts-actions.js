import { v4 as uuidv4 } from "uuid";
import { createAction } from "@reduxjs/toolkit";
// import actionTypes from "./contacts-types";

export const add = createAction("contacts/add", (name, number) => ({
  payload: {
    id: uuidv4(),
    name,
    number,
  },
}));

export const del = createAction("contacts/delete");
export const filter = createAction("contacts/filter");

// Create actions with use Vanilla Redux (without Redux Toolkit)
// export const add = (name, number) => ({
//   type: actionTypes.ADD,
//   payload: {
//     id: uuidv4(),
//     name,
//     number,
//   },
// });

// export const del = (id) => ({
//   type: actionTypes.DEL,
//   payload: id,
// });

// export const filter = (value) => ({
//   type: actionTypes.FILTER,
//   payload: value,
// });
