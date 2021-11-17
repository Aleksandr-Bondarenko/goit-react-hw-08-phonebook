import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { filterContacts } from "../../redux/contacts/contacts-actions";
import { getFilter } from "../../redux/contacts/contacts-selectors";
import s from "./Filter.module.css";

function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const filterInputId = useRef(uuidv4());

  return (
    <div className={s.filter}>
      <label className={s.label} htmlFor={filterInputId.current}>
        Find contacts by name:
      </label>
      <input
        className={s.input}
        type="text"
        name="filter"
        value={value}
        id={filterInputId.current}
        onChange={(event) =>
          dispatch(filterContacts(event.currentTarget.value))
        }
        autoComplete="off"
      />
    </div>
  );
}

export default Filter;
