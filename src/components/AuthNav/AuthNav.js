import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

function AuthNav() {
  return (
    <div className={s.box}>
      <NavLink to="register" className={s.link}>
        Registration
      </NavLink>
      <NavLink to="login" className={s.link}>
        Log In
      </NavLink>
    </div>
  );
}

export default AuthNav;
