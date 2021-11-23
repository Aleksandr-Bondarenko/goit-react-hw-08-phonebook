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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isLoading = useSelector(getLoading);

  const nameId = useRef(uuidv4());
  const phoneId = useRef(uuidv4());

  const currentContacts = useSelector(getItems);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;

      case "phone":
        setPhone(e.currentTarget.value);
        break;

      default:
        return;
    }
  };

  const toAddContact = (name, number) => {
    const contact = {
      name,
      number,
    };
    dispatch(addContacts(contact));
  };

  const resetForm = () => {
    setName("");
    setPhone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsAddBtnLoading(!isLoading);

    if (currentContacts.find((contact) => contact.name === name)) {
      toast.error(`${name} is already in contacts.`);
      return;
    } else if (currentContacts.find((contact) => contact.number === phone)) {
      const doubleContact = currentContacts.filter(
        (contact) => contact.number === phone
      );
      toast.error(
        `A number ${phone} is assigned to a contact with name ${doubleContact[0].name}.`
      );
      return;
    }

    toAddContact(name, phone);
    resetForm();
    // setTimeout(() => setIsAddBtnLoading(false), 20000);
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
        value={name}
        id={nameId.current}
        onChange={handleInputChange}
        autoComplete="off"
      />

      <label className={s.label} htmlFor={phoneId.current}>
        <PhoneIcon sx={{ color: "action.active" }} />{" "}
        <span className={s.labelText}>Phone number</span>
      </label>

      <input
        className={s.input}
        type="tel"
        name="phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
        maxLength="19"
        value={phone}
        id={phoneId.current}
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
