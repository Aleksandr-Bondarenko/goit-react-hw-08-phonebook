import { useSelector } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import { getVisibleContacts } from "../../redux/contacts/contacts-selectors";
import s from "./ContactsList.module.css";

function ContactsList() {
  const visibleContacts = useSelector(getVisibleContacts);

  return (
    <ul className={s.list}>
      {visibleContacts.map(({ id, name, number }) => (
        <ContactItem key={id} id={id} name={name} phone={number} />
      ))}
    </ul>
  );
}

export default ContactsList;
