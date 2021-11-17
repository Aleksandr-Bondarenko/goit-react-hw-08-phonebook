import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn } from "../../redux/auth/auth-selectors";
import s from "./AppBar.module.css";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";

function AppBar() {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <div>
      <nav>
        <NavLink to="/" className={s.link}>
          Home
        </NavLink>
        <NavLink to="contacts" className={s.link}>
          Contacts
        </NavLink>
      </nav>

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
}

export default AppBar;
