export const getItems = (state) => state.contacts.items;
export const getFilter = (state) => state.contacts.filter;

export const getVisibleContacts = (state) => {
  const filterValue = getFilter(state);
  const contactsList = getItems(state);
  const filterValueNormalize = filterValue.toLowerCase().trim(" ");

  return contactsList.filter(({ name }) =>
    name.toLowerCase().includes(filterValueNormalize)
  );
};
