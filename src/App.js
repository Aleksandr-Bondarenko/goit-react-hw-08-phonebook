import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactsList from "./components/ContactsList/ContactsList.js";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) ?? []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitContactForm = (data) => {
    if (contacts.find((contact) => contact.name === data.name)) {
      alert(`${data.name} is already in contacts.`);
    } else setContacts((prevContacts) => [data, ...prevContacts]);
  };

  const toDelContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const handleContactsFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    // console.log("abcdef".includes("")); // Проверка
    const filterNormalize = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterNormalize)
    );
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmitContactForm} />
      <h2 className="listTitle">Contacts</h2>
      <Filter onChange={handleContactsFilter} value={filter} />
      {getVisibleContacts().length === 0 ? (
        <p className="notifyText">
          {filter.length > 0 ? "No results for your search" : "No contacts yet"}
        </p>
      ) : (
        <ContactsList
          contacts={getVisibleContacts()}
          toDelContact={toDelContact}
        />
      )}
    </div>
  );
}

export default App;
