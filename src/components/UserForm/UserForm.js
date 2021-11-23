import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { register, logIn } from "../../redux/auth/auth-operations";
import { getAuthLoading } from "../../redux/auth/auth-selectors";
import s from "./UserForm.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { ThemeProvider } from "@mui/material/styles";
import themeUserForm from "./UserFormStyleOverrides";
import { LoadingButton } from "@mui/lab";

function UserForm({ url }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const isLoading = useSelector(getAuthLoading);

  const nameId = useRef(uuidv4());
  const emailId = useRef(uuidv4());
  const passwordId = useRef(uuidv4());
  const repeatPasswordId = useRef(uuidv4());

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;

      case "email":
        setEmail(e.currentTarget.value);
        break;

      case "password":
        setPassword(e.currentTarget.value);
        break;

      case "repeat_password":
        setRepeatPassword(e.currentTarget.value);
        break;

      default:
        return;
    }
  };

  const toResetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  const handleSubmitRegisterForm = (e) => {
    e.preventDefault();

    if (repeatPassword && password !== repeatPassword) {
      toast.error("Password entry error!");
      return;
    }

    url === "/register" && dispatch(register({ name, email, password }));
    url === "/login" && dispatch(logIn({ email, password }));

    toResetForm();
  };

  return (
    <>
      <form
        className={s.form}
        onSubmit={handleSubmitRegisterForm}
        name="user_register_form"
      >
        <ThemeProvider theme={themeUserForm}>
          {url === "/register" && (
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, mb: 0.5 }} />
              <TextField
                name="name"
                value={name}
                onChange={handleChangeInput}
                type="text"
                id={nameId.current}
                required
                label="Name"
                variant="standard"
                autoComplete="off"
              />
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
            <AlternateEmailIcon
              sx={{ color: "action.active", mr: 1, mb: 0.5 }}
            />
            <TextField
              name="email"
              value={email}
              onChange={handleChangeInput}
              type="email"
              id={emailId.current}
              required
              autoComplete="off"
              label="Email"
              variant="standard"
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
            <LockIcon sx={{ color: "action.active", mr: 1, mb: 0.5 }} />
            <TextField
              name="password"
              value={password}
              onChange={handleChangeInput}
              type="password"
              id={passwordId.current}
              required
              autoComplete="off"
              label="Password"
              variant="standard"
            />
          </Box>

          {url === "/register" && (
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
              <LockIcon sx={{ color: "action.active", mr: 1, mb: 0.5 }} />
              <TextField
                name="repeat_password"
                value={repeatPassword}
                onChange={handleChangeInput}
                type="password"
                id={repeatPasswordId.current}
                required
                autoComplete="off"
                label="Repeat password"
                variant="standard"
              />
            </Box>
          )}

          <LoadingButton
            loading={isLoading}
            loadingPosition="end"
            endIcon={
              url === "/register" ? <AppRegistrationIcon /> : <LoginIcon />
            }
            variant="outlined"
            type="submit"
            sx={url === "/register" ? { width: 130 } : { width: 100 }}
          >
            {url === "/register" ? "To Register" : "Log In"}
          </LoadingButton>
        </ThemeProvider>
      </form>
    </>
  );
}

export default UserForm;
