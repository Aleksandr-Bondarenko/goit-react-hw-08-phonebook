import axios from "axios";
import toast from "react-hot-toast";
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactsRequest,
  addContactsSuccess,
  addContactsError,
  delContactsRequest,
  delContactsSuccess,
  delContactsError,
} from "./contacts-actions";

axios.defaults.baseURL = "http://localhost:4140";

export const fetchContacts = () => (dispatch) => {
  dispatch(fetchContactsRequest());

  axios
    .get("/contacts")
    .then(({ data }) => dispatch(fetchContactsSuccess(data)))
    .catch((error) => dispatch(fetchContactsError(error)));
};

export const addContact = (name, number, isSubmitForm) => (dispatch) => {
  const contact = {
    name,
    number,
  };

  dispatch(addContactsRequest());

  axios
    .post("/contacts", contact)
    .then(({ data }) => {
      toast.success(`Contact ${name} successfully added.`);
      console.log("Нужно убрать лоадер");
      console.log(isSubmitForm);
      dispatch(addContactsSuccess(data));
    })
    .catch((error) => dispatch(addContactsError(error)));
};

export const delContact = (contactId, contactName) => (dispatch) => {
  dispatch(delContactsRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => {
      toast.success(`Contact ${contactName} successfully deleted.`);
      dispatch(delContactsSuccess(contactId));
    })
    .catch((error) => dispatch(delContactsError(error)));
};
