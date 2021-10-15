import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import s from "./ContactForm.module.css";

function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameId = useRef("");
  const numberId = useRef("");

  useEffect(() => {
    nameId.current = uuidv4();
    numberId.current = uuidv4();
  }, []);

  const handleInputChange = (e) => {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;

      case "number":
        setNumber(e.currentTarget.value);
        break;

      default:
        return;
    }
  };

  const handleAddContact = (e) => {
    e.preventDefault();

    const addedContact = {
      id: uuidv4(),
      name,
      number,
    };

    onSubmit(addedContact);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setNumber("");
  };

  return (
    <form
      className={s.form}
      onSubmit={handleAddContact}
      name="adding_contacts_form"
    >
      <label className={s.label} htmlFor={nameId.current}>
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
        id={nameId.current}
        onChange={handleInputChange}
      />

      <label className={s.label} htmlFor={numberId.current}>
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
        id={numberId.current}
        onChange={handleInputChange}
      />

      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
