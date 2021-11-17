import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { register, logIn } from "../../redux/auth/auth-operations";

function UserForm({ url }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

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
    <form onSubmit={handleSubmitRegisterForm} name="user_register_form">
      {url === "/register" && (
        <>
          <label htmlFor={nameId.current}>Name</label>
          <input
            name="name"
            value={name}
            onChange={handleChangeInput}
            type="text"
            id={emailId.current}
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
        type="text"
        id={emailId.current}
        required
      />
      <br />

      <label htmlFor={passwordId.current}>Password</label>
      <input
        name="password"
        value={password}
        onChange={handleChangeInput}
        type="text"
        id={passwordId.current}
        required
      />
      <br />

      {url === "/register" && (
        <>
          <label htmlFor={repeatPasswordId.current}>Repeat Password</label>
          <input
            name="repeat_password"
            value={repeatPassword}
            onChange={handleChangeInput}
            type="text"
            id={repeatPasswordId.current}
            required
          />
          <br />
        </>
      )}
      <button type="submit">
        {url === "/register" ? "Register" : "Login"}
      </button>
    </form>
  );
}

export default UserForm;
