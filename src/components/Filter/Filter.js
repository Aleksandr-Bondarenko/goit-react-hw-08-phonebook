import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { filterContacts } from "../../redux/contacts/contacts-actions";
import { getFilter } from "../../redux/contacts/contacts-selectors";
import s from "./Filter.module.css";
import Input from "@mui/material/Input";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const filterInputId = useRef(uuidv4());

  const themeFilterInput = createTheme({
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            "&:after": {
              borderBottomColor: "#f0850c",
            },
          },
          input: {
            fontFamily: "Signika",
            fontSize: "16px",
            color: "#000000",
            padding: "0",
          },
        },
      },
    },
  });

  return (
    <div className={s.filter}>
      <label className={s.label} htmlFor={filterInputId.current}>
        Find contacts by name:
      </label>

      <ThemeProvider theme={themeFilterInput}>
        <Input
          id={filterInputId.current}
          type="text"
          name="filter"
          value={value}
          onChange={(event) =>
            dispatch(filterContacts(event.currentTarget.value))
          }
          autoComplete="off"
        />
      </ThemeProvider>
    </div>
  );
}

export default Filter;
