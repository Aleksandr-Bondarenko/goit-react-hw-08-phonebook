import { createAction } from "@reduxjs/toolkit";

export const fetchContactsRequest = createAction(
  "contacts/fetchContactsRequest"
);
export const fetchContactsSuccess = createAction(
  "contacts/fetchContactsSuccess"
);
export const fetchContactsError = createAction("contacts/fetchContactsError");

export const addContactsRequest = createAction("contacts/addContactsRequest");
export const addContactsSuccess = createAction("contacts/addContactsSuccess");
export const addContactsError = createAction("contacts/addContactsError");

export const delContactsRequest = createAction("contacts/delContactsRequest");
export const delContactsSuccess = createAction("contacts/delContactsSuccess");
export const delContactsError = createAction("contacts/delContactsError");

export const filterContacts = createAction("contacts/filter");
