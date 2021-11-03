import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContactItem from "../ContactItem/ContactItem";
import * as actions from "../../redux/contacts/contacts-actions";
import s from "./ContactsList.module.css";

function ContactsList({ contacts, filter, toDelContact }) {
  return contacts.length === 0 ? (
    <p className="notifyText">
      {filter.length > 0 ? "No results for your search" : "No contacts yet"}
    </p>
  ) : (
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

const getVisibleContacts = (contactsList, filterValue) => {
  const filterValueNormalize = filterValue.toLowerCase().trim(" ");
  return contactsList.filter(({ name }) =>
    name.toLowerCase().includes(filterValueNormalize)
  );
};

const mapStateToProps = (state) => {
  const { filter, items } = state.contacts;

  return {
    filter: state.contacts.filter,
    contacts: getVisibleContacts(items, filter),
  };
};

const mapDispatchToProps = (dispatch) => ({
  toDelContact: (id) => dispatch(actions.del(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);

ContactsList.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
