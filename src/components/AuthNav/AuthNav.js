import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

function AuthNav() {
  return (
    <div>
      <NavLink to="register" className={s.link}>
        Registration
      </NavLink>
      <NavLink to="login" className={s.link}>
        Login
      </NavLink>
    </div>
  );
}

export default AuthNav;
