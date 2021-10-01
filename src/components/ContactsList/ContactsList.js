import ContactItem from "../ContactItem/ContactItem";
import s from "./ContactsList.module.css";

function ContactsList({ contacts, toDelContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          toDelContact={toDelContact}
        />
      ))}
    </ul>
  );
}

export default ContactsList;
