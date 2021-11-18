import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import {
  getEditableData,
  getItems,
} from "../../redux/contacts/contacts-selectors";
import { editContacts } from "../../redux/contacts/contacts-operations";
import s from "./EditForm.module.css";

function EditForm() {
  const dispatch = useDispatch();

  const editableData = useSelector(getEditableData);
  const currentContacts = useSelector(getItems);

  const [editableName, setEditableName] = useState(editableData.name);
  const [editablePhone, setEditablePhone] = useState(editableData.phone);

  const nameId = useRef(uuidv4());
  const phoneId = useRef(uuidv4());

  const handleInputChange = (e) => {
    switch (e.currentTarget.name) {
      case "edit-name":
        setEditableName(e.currentTarget.value);
        break;

      case "edit-phone":
        setEditablePhone(e.currentTarget.value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      currentContacts.find(
        (contact) =>
          contact.name === editableName && contact.id !== editableData.id
      )
    ) {
      toast.error(
        `Contact with name ${editableName} is already in exists! Try another name.`
      );
      return;
    } else if (
      currentContacts.find(
        (contact) =>
          contact.number === editablePhone && contact.id !== editableData.id
      )
    ) {
      toast.error(
        `Contact with phone number ${editablePhone} is already in exists! Try another phone number.`
      );
      return;
    }

    const updateContact = {
      id: editableData.id,
      name: editableName,
      number: editablePhone,
    };

    dispatch(editContacts(updateContact));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit} name="edit_contacts_form">
      <label className={s.label} htmlFor={nameId.current}>
        Name
      </label>
      <input
        className={s.input}
        type="text"
        name="edit-name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        value={editableName}
        id={nameId.current}
        onChange={handleInputChange}
      />

      <label className={s.label} htmlFor={phoneId.current}>
        Number
      </label>
      <input
        className={s.input}
        type="tel"
        name="edit-phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
        value={editablePhone}
        id={phoneId.current}
        onChange={handleInputChange}
      />

      <div className={s.box}>
        <button className={s.btn} type="submit" disabled={false}>
          Edit contact
        </button>
      </div>
    </form>
  );
}

export default EditForm;
