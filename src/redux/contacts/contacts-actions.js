import { createAction } from "@reduxjs/toolkit";

export const filterContacts = createAction("contacts/filter");
export const modalVisible = createAction("contacts/modal/visible");
export const modalEditableData = createAction("contacts/modal/editable-data");
