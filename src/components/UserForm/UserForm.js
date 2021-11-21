import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import Loader from "react-loading";
import { register, logIn } from "../../redux/auth/auth-operations";
import { getAuthLoading } from "../../redux/auth/auth-selectors";
import s from "./UserForm.module.css";

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
      <form onSubmit={handleSubmitRegisterForm} name="user_register_form">
        {url === "/register" && (
          <>
            <label htmlFor={nameId.current}>Name</label>
            <input
              name="name"
              value={name}
              onChange={handleChangeInput}
              type="text"
              id={nameId.current}
              required
            />
            <br />
          </>
        )}

        <label htmlFor={emailId.current}>Email</label>
        <input
          name="email"
          value={email}
          onChange={handleChangeInput}
          type="email"
          id={emailId.current}
          required
          autoComplete="off"
        />
        <br />

        <label htmlFor={passwordId.current}>Password</label>
        <input
          name="password"
          value={password}
          onChange={handleChangeInput}
          type="password"
          id={passwordId.current}
          required
          autoComplete="off"
        />
        <br />

        {url === "/register" && (
          <>
            <label htmlFor={repeatPasswordId.current}>Repeat Password</label>
            <input
              name="repeat_password"
              value={repeatPassword}
              onChange={handleChangeInput}
              type="password"
              id={repeatPasswordId.current}
              required
              autoComplete="off"
            />
            <br />
          </>
        )}
        <button type="submit">
          {url === "/register" ? "Register" : "Log in"}
        </button>
      </form>

      {isLoading && (
        <Loader
          className={s.loader}
          type={"spinningBubbles"}
          color={"#2b2626"}
          height={80}
          width={80}
        />
      )}
    </>
  );
}

export default UserForm;
