import { useEffect } from "react";
import { useSelector } from "react-redux";

import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactsList from "./components/ContactsList/ContactsList.js";
import {
  getItems,
  getFilter,
  getVisibleContacts,
} from "./redux/contacts/contacts-selectors";
import "./App.css";

function App() {
  const contacts = useSelector(getItems);
  const visibleContacts = useSelector(getVisibleContacts);
  const filter = useSelector(getFilter);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2 className="listTitle">Contacts</h2>
      <Filter />
      {visibleContacts.length === 0 ? (
        <p className="notifyText">
          {filter.length > 0 ? "No results for your search" : "No contacts yet"}
        </p>
      ) : (
        <ContactsList />
      )}
    </div>
  );
}

export default App;
