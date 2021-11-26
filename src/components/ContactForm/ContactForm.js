import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { addContacts } from "../../redux/contacts/contacts-operations";
import { getItems, getLoading } from "../../redux/contacts/contacts-selectors";
import s from "./ContactForm.module.css";
import { LoadingButton } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function ContactForm() {
  const [contact, setContact] = useState({
    name: "",
    number: "",
  });

  const isLoading = useSelector(getLoading);

  const nameId = useRef(uuidv4());
  const numberId = useRef(uuidv4());

  const currentContacts = useSelector(getItems);

  const dispatch = useDispatch();

  const handleInputChange = (e) =>
    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const toAddContact = (contact) => {
    dispatch(addContacts(contact));
  };

  const resetForm = () => {
    setContact({
      name: "",
      number: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentContacts.find(({ name }) => name === contact.name)) {
      toast.error(`${contact.name} is already in contacts.`);
      return;
    } else if (
      currentContacts.find(({ number }) => number === contact.number)
    ) {
      const doubleContact = currentContacts.find(
        ({ number }) => number === contact.number
      );
      toast.error(
        `A number ${contact.number} is assigned to a contact with name ${doubleContact.name}.`
      );
      return;
    }

    toAddContact(contact);
    resetForm();
  };

  const themeAddBtn = createTheme({
    components: {
      MuiLoadingButton: {
        styleOverrides: {
          root: {
            fontFamily: "Signika",
            fontSize: "16px",
            textTransform: "capitalize",
            color: "#000000",
            borderColor: "#000000",
            "&:hover": {
              color: "#ffffffcc",
              borderColor: "#f0850c",
              boxShadow: "inset 0 0 10px 1px #ffffffcc",
            },
          },
        },
      },
    },
  });

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit}
      name="adding_contacts_form"
    >
      <label className={s.label} htmlFor={nameId.current}>
        <PersonIcon sx={{ color: "action.active" }} />{" "}
        <span className={s.labelText}>Name</span>
      </label>

      <input
        className={s.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        value={contact.name}
        id={nameId.current}
        onChange={handleInputChange}
        autoComplete="off"
      />

      <label className={s.label} htmlFor={numberId.current}>
        <PhoneIcon sx={{ color: "action.active" }} />{" "}
        <span className={s.labelText}>Phone number</span>
      </label>

      <input
        className={s.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
        maxLength="19"
        value={contact.number}
        id={numberId.current}
        onChange={handleInputChange}
        autoComplete="off"
      />

      <div className={s.btnBox}>
        <ThemeProvider theme={themeAddBtn}>
          <LoadingButton
            loading={isLoading}
            loadingPosition="end"
            endIcon={<AddCircleOutlineIcon />}
            variant="outlined"
            type="submit"
          >
            Add contact
          </LoadingButton>
        </ThemeProvider>
      </div>
    </form>
  );
}

export default ContactForm;
