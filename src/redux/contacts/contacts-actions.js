import { v4 as uuidv4 } from "uuid";
import actionTypes from "./contacts-types";

export const add = (name, number) => ({
  type: actionTypes.ADD,
  payload: {
    id: uuidv4(),
    name,
    number,
  },
});

export const del = (id) => ({
  type: actionTypes.DEL,
  payload: id,
});

export const filter = (value) => ({
  type: actionTypes.FILTER,
  payload: value,
});
