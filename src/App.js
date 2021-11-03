import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactsList from "./components/ContactsList/ContactsList.js";
import "./App.css";

function App({ contacts }) {
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2 className="listTitle">Contacts</h2>
      <Filter />
      <ContactsList />
    </div>
  );
}

const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
  filter: state.contacts.filter,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  contacts: PropTypes.array,
};
