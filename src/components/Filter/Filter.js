import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as actions from "../../redux/contacts/contacts-actions";
import { getFilter } from "../../redux/contacts/contacts-selectors";
import s from "./Filter.module.css";

function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

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
        onChange={(event) =>
          dispatch(actions.filter(event.currentTarget.value))
        }
        autoComplete="off"
      />
    </div>
  );
}

export default Filter;
