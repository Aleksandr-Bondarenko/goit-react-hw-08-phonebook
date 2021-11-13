import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";
import Loader from "react-loading";
import { getLoading } from "../../redux/contacts/contacts-selectors";
import { delContacts } from "../../redux/contacts/contacts-operations";
import s from "./ContactItem.module.css";

function ContactItem({ id, name, phone }) {
  const loading = useSelector(getLoading);
  const [isBtnLoader, setIsBtnLoader] = useState(loading);

  const dispatch = useDispatch();

  const toDelContact = (id, name) => {
    setIsBtnLoader(!loading);
    dispatch(delContacts({ id, name }));
  };

  return (
    <li className={s.item}>
      {name}: <span className={s.tel}>{phone}</span>
      {isBtnLoader && (
        <Loader
          className={"s.loader"}
          type={"spinningBubbles"}
          color={"#2b2626"}
          height={15}
          width={15}
        />
      )}
      <button
        className={s.btn}
        onClick={() => {
          toDelContact(id, name);
        }}
        type="button"
        disabled={isBtnLoader}
      >
        Delete
      </button>
    </li>
  );
}

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};
