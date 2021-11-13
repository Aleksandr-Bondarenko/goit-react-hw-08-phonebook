import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loading";
import { Toaster } from "react-hot-toast";

import { fetchContacts } from "./redux/contacts/contacts-operations";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactsList from "./components/ContactsList/ContactsList.js";
import {
  getLoading,
  getFilter,
  getVisibleContacts,
} from "./redux/contacts/contacts-selectors";
import "./App.css";

function App() {
  const visibleContacts = useSelector(getVisibleContacts);
  const filter = useSelector(getFilter);
  const isContactsLoading = useSelector(getLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2 className="listTitle">Contacts</h2>
      <Filter />

      {visibleContacts.length === 0 ? (
        isContactsLoading ? (
          <Loader
            className={"ContactsLoader"}
            type={"spinningBubbles"}
            color={"#2b2626"}
            height={80}
            width={80}
          />
        ) : (
          <p className="notifyText">
            {filter.length > 0
              ? "No results for your search"
              : "No contacts yet"}
          </p>
        )
      ) : (
        <ContactsList />
      )}

      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={10}
        toastOptions={{
          className: "Toaster",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
