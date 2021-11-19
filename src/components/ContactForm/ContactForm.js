import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import Loader from "react-loading";
import { addContacts } from "../../redux/contacts/contacts-operations";
import { getItems, getLoading } from "../../redux/contacts/contacts-selectors";
import s from "./ContactForm.module.css";

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isLoading = useSelector(getLoading);
  // const [isAddBtnLoading, setIsAddBtnLoading] = useState(isLoading);

  const nameId = useRef(uuidv4());
  const phoneId = useRef(uuidv4());

  const currentContacts = useSelector(getItems);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;

      case "phone":
        setPhone(e.currentTarget.value);
        break;

      default:
        return;
    }
  };

  const toAddContact = (name, number) => {
    const contact = {
      name,
      number,
    };
    dispatch(addContacts(contact));
  };

  const resetForm = () => {
    setName("");
    setPhone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsAddBtnLoading(!isLoading);

    if (currentContacts.find((contact) => contact.name === name)) {
      toast.error(`${name} is already in contacts.`);
      return;
    } else if (currentContacts.find((contact) => contact.number === phone)) {
      const doubleContact = currentContacts.filter(
        (contact) => contact.number === phone
      );
      toast.error(
        `A number ${phone} is assigned to a contact with name ${doubleContact[0].name}.`
      );
      return;
    }

    toAddContact(name, phone);
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

      <label className={s.label} htmlFor={phoneId.current}>
        Number
      </label>
      <input
        className={s.input}
        type="tel"
        name="phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
        value={phone}
        id={phoneId.current}
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
