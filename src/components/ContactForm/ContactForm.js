import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import s from "./ContactForm.module.css";

class ContactForm extends Component {
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
    inputNameId: PropTypes.string,
    inputNumberId: PropTypes.string,
    handleAddContact: PropTypes.func,
    handleInputChange: PropTypes.func,
  };

  state = {
    name: "",
    number: "",
  };

  inputNameId = uuidv4();
  inputNumberId = uuidv4();

  handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleAddContact = (e) => {
    e.preventDefault();

    const addedContact = {
      id: uuidv4(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.onSubmit(addedContact);
    this.resetContactForm();
  };

  resetContactForm = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form
        className={s.form}
        onSubmit={this.handleAddContact}
        name="adding_contacts_form"
      >
        <label className={s.label} htmlFor={this.inputNameId}>
          Name
        </label>
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          id={this.inputNameId}
          onChange={this.handleInputChange}
        />

        <label className={s.label} htmlFor={this.inputNumberId}>
          Number
        </label>
        <input
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          id={this.inputNumberId}
          onChange={this.handleInputChange}
        />

        <button className={s.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
export default ContactForm;
