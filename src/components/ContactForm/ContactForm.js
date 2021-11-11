import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import Loader from "react-loading";
import { addContact } from "../../redux/contacts/contacts-operations";
import { getItems, getLoading } from "../../redux/contacts/contacts-selectors";
import s from "./ContactForm.module.css";

function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const isLoading = useSelector(getLoading);
  // const [isAddBtnLoading, setIsAddBtnLoading] = useState(isLoading);

  const nameId = useRef("");
  const numberId = useRef("");

  const currentContacts = useSelector(getItems);

  const dispatch = useDispatch();

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

  const toAddContact = (name, number) => {
    dispatch(addContact(name, number));
  };

  const resetForm = () => {
    setName("");
    setNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsAddBtnLoading(!isLoading);

    if (currentContacts.find((contact) => contact.name === name)) {
      toast.error(`${name} is already in contacts.`);
      return;
    }

    toAddContact(name, number);
    resetForm();
    // setTimeout(() => setIsAddBtnLoading(false), 20000);
  };

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit}
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

      <div className={s.box}>
        <button className={s.btn} type="submit" disabled={isLoading}>
          Add contact
        </button>
        {isLoading && (
          <Loader
            className={"s.loader"}
            type={"spinningBubbles"}
            color={"#2b2626"}
            height={25}
            width={25}
          />
        )}
      </div>
    </form>
  );
}

export default ContactForm;
