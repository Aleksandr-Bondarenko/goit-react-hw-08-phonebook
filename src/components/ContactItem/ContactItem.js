import PropTypes from "prop-types";
import s from "./ContactItem.module.css";

function ContactItem({ id, name, number, toDelContact }) {
  return (
    <li className={s.item}>
      {name}: <span className={s.tel}>{number}</span>
      <button
        className={s.btn}
        onClick={() => {
          toDelContact(id);
        }}
        type="button"
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
  number: PropTypes.string,
  toDelContact: PropTypes.func,
};
