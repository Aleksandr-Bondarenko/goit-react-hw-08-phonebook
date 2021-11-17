import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

function AuthNav() {
  return (
    <div>
      <NavLink
        to="register"
        className={({ isActive }) => {
          return isActive ? `${s.active} ${s.link}` : `${s.link}`;
        }}
      >
        Registration
      </NavLink>
      <NavLink
        to="login"
        className={({ isActive }) => {
          return isActive ? `${s.active} ${s.link}` : `${s.link}`;
        }}
      >
        Login
      </NavLink>
    </div>
  );
}

export default AuthNav;
