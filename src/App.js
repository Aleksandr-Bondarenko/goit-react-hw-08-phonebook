import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactsList from "./components/ContactsList/ContactsList.js";
import "./App.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
    // contacts: [
    //   { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    //   { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    //   { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    //   { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    // ],
  };

  getSavedContacts = () => {
    if (localStorage.getItem("contacts") === null) {
      localStorage.setItem("contacts", JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem("contacts"));
  };

  componentDidMount() {
    console.log("ComponentDidMount-read contacts from LocalStorage");
    console.log(this.getSavedContacts());
    if (this.getSavedContacts()) {
      this.setState({ contacts: this.getSavedContacts() });
    }
  }

  componentDidUpdate() {
    console.log("ComponentDidUpdate - rewrite LocalStorage");
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }

  onSubmitContactForm = (data) => {
    if (this.state.contacts.find((contact) => contact.name === data.name)) {
      alert(`${data.name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [data, ...contacts],
      }));
    }
  };

  handleContactsFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    // console.log("abcdef".includes("")); // Проверка
    const { filter, contacts } = this.state;
    const filterNormalize = filter.toLowerCase();
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filterNormalize);
    });
  };

  toDelContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => {
        return contact.id !== contactId;
      }),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitContactForm} />
        <h2 className="listTitle">Contacts</h2>
        <Filter onChange={this.handleContactsFilter} value={filter} />
        {visibleContacts.length === 0 ? (
          <p className="notifyText">
            {filter.length > 0
              ? "No results for your search"
              : "No contacts yet"}
          </p>
        ) : (
          <ContactsList
            contacts={visibleContacts}
            toDelContact={this.toDelContact}
          />
        )}
      </div>
    );
  }
}

export default App;
