import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import * as actions from "../../redux/contacts/contacts-actions";
import s from "./Filter.module.css";

function Filter({ onChange, value }) {
  const filterInputId = uuidv4();

  return (
    <div className={s.filter}>
      <label className={s.label} htmlFor={filterInputId}>
        Find contacts by name:
      </label>
      <input
        className={s.input}
        type="text"
        name="filter"
        value={value}
        id={filterInputId}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (event) => dispatch(actions.filter(event.currentTarget.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
