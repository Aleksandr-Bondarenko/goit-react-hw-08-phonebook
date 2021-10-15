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

  const visibleContacts = getVisibleContacts();

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmitContactForm} />
      <h2 className="listTitle">Contacts</h2>
      <Filter onChange={handleContactsFilter} value={filter} />
      {visibleContacts.length === 0 ? (
        <p className="notifyText">
          {filter.length > 0 ? "No results for your search" : "No contacts yet"}
        </p>
      ) : (
        <ContactsList contacts={visibleContacts} toDelContact={toDelContact} />
      )}
    </div>
  );
}

export default App;

//   getSavedContacts = () => {
//     if (localStorage.getItem("contacts") === null) {
//       localStorage.setItem("contacts", JSON.stringify([]));
//     }
//     return JSON.parse(localStorage.getItem("contacts"));
//   };

//   componentDidMount() {
//     // console.log("ComponentDidMount-read contacts from LocalStorage");
//     // console.log(this.getSavedContacts());
//     if (this.getSavedContacts()) {
//       this.setState({ contacts: this.getSavedContacts() });
//     }
//   }

//   componentDidUpdate() {
//     // console.log("ComponentDidUpdate - rewrite LocalStorage");
//     localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//   }

//   onSubmitContactForm = (data) => {
//     if (this.state.contacts.find((contact) => contact.name === data.name)) {
//       alert(`${data.name} is already in contacts.`);
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [data, ...contacts],
//       }));
//     }
//   };

//   handleContactsFilter = (e) => {
//     this.setState({ filter: e.currentTarget.value });
//   };

// getVisibleContacts = () => {
//   // console.log("abcdef".includes("")); // Проверка
//   const { filter, contacts } = this.state;
//   const filterNormalize = filter.toLowerCase();
//   return contacts.filter((contact) => {
//     return contact.name.toLowerCase().includes(filterNormalize);
//   });
// };

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();

//     return (

//     );
//   }
// }
