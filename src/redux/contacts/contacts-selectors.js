import { createSelector } from "@reduxjs/toolkit";

export const getItems = (state) => state.contacts.items;
export const getFilter = (state) => state.contacts.filter;
export const getLoading = (state) => state.contacts.loading;
export const getError = (state) => state.contacts.error;
export const getIsShow = (state) => state.contacts.modal.isShow;
export const getEditableData = (state) => state.contacts.modal.editableData;

export const getVisibleContacts = createSelector(
  [getItems, getFilter],
  (items, filter) => {
    const filterNormalize = filter.toLowerCase().trim(" ");
    return items.filter(({ name }) =>
      name.toLowerCase().includes(filterNormalize)
    );
  }
);
