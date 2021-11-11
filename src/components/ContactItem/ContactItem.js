import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";
import Loader from "react-loading";
import { getLoading } from "../../redux/contacts/contacts-selectors";
import { delContact } from "../../redux/contacts/contacts-operations";
import s from "./ContactItem.module.css";

function ContactItem({ id, name, number }) {
  const loading = useSelector(getLoading);
  const [isBtnLoader, setIsBtnLoader] = useState(loading);

  const dispatch = useDispatch();
  const toDelContact = (id, name) => {
    setIsBtnLoader(!loading);
    dispatch(delContact(id, name));
  };

  return (
    <li className={s.item}>
      {name}: <span className={s.tel}>{number}</span>
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
  id: PropTypes.number,
  name: PropTypes.string,
  number: PropTypes.string,
};
