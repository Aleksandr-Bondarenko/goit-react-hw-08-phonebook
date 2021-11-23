import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  modalVisible,
  modalEditableData,
} from "../../redux/contacts/contacts-actions";
import { getLoading, getIsShow } from "../../redux/contacts/contacts-selectors";
import { delContacts } from "../../redux/contacts/contacts-operations";
import ModalEditor from "../ModalEditor/ModalEditor";

import { LoadingButton } from "@mui/lab";
import { ThemeProvider } from "@mui/material/styles";
import themeContactItem from "./ContactItemStyleOverrides";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
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
    <ThemeProvider theme={themeContactItem}>
      <li className={s.item}>
        <DoubleArrowIcon />
        {name}:<span className={s.tel}>{phone}</span>
        <div className={s.btnBox}>
          <LoadingButton
            loading={isBtnLoader}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="outlined"
            onClick={() => {
              toDelContact(id, name);
            }}
          >
            Delete
          </LoadingButton>
          <LoadingButton
            className="sizeSmall"
            loading={false}
            loadingPosition="start"
            startIcon={<EditIcon />}
            variant="outlined"
            onClick={() => {
              toShowModal(id, name, phone);
            }}
          >
            Edit
          </LoadingButton>
        </div>
        {isShowModal && <ModalEditor />}
      </li>
    </ThemeProvider>
  );
}

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};
