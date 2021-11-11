import { createSelector } from "@reduxjs/toolkit";

export const getItems = (state) => state.contacts.items;
export const getFilter = (state) => state.contacts.filter;
export const getLoading = (state) => state.contacts.loading;
export const getError = (state) => state.contacts.error;

// export const getVisibleContacts = (state) => {
//   const filterValue = getFilter(state);
//   const contactsList = getItems(state);
//   const filterValueNormalize = filterValue.toLowerCase().trim(" ");

//   return contactsList.filter(({ name }) =>
//     name.toLowerCase().includes(filterValueNormalize)
//   );
// };

export const getVisibleContacts = createSelector(
  [getItems, getFilter],
  (items, filter) => {
    const filterNormalize = filter.toLowerCase().trim(" ");
    return items.filter(({ name }) =>
      name.toLowerCase().includes(filterNormalize)
    );
  }
);
