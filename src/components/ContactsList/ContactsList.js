import { useSelector, useDispatch } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import * as actions from "../../redux/contacts/contacts-actions";
import { getVisibleContacts } from "../../redux/contacts/contacts-selectors";
import s from "./ContactsList.module.css";

function ContactsList() {
  const visibleContacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  const toDelContact = (id) => dispatch(actions.del(id));

  return (
    <ul className={s.list}>
      {visibleContacts.map(({ id, name, number }) => (
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
