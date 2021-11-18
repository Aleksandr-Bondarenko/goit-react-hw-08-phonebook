import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loading";
import PropTypes from "prop-types";
import {
  modalVisible,
  modalEditableData,
} from "../../redux/contacts/contacts-actions";
import { getLoading, getIsShow } from "../../redux/contacts/contacts-selectors";
import { delContacts } from "../../redux/contacts/contacts-operations";
import ModalEditor from "../ModalEditor/ModalEditor";
import s from "./ContactItem.module.css";

function ContactItem({ id, name, phone }) {
  const dispatch = useDispatch();

  const loading = useSelector(getLoading);
  const isShowModal = useSelector(getIsShow);

  const [isBtnLoader, setIsBtnLoader] = useState(loading);

  const toDelContact = (id, name) => {
    setIsBtnLoader(!loading);
    dispatch(delContacts({ id, name }));
  };

  const toShowModal = (id, name, phone) => {
    dispatch(modalVisible(true));
    dispatch(modalEditableData({ id, name, phone }));
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
      <button
        className={s.btn}
        onClick={() => {
          toShowModal(id, name, phone);
        }}
        type="button"
        disabled={isBtnLoader}
      >
        Edit
      </button>
      {isShowModal && <ModalEditor />}
    </li>
  );
}

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};
