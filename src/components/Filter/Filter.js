import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
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
      />
    </div>
  );
}

export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  filterInputId: PropTypes.string,
};
