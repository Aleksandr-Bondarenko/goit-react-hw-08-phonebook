import { useDispatch, useSelector } from "react-redux";
import { getUserName, getUserEmail } from "../../redux/auth/auth-selectors";
import { logOut } from "../../redux/auth/auth-operations";
import s from "./UserMenu.module.css";

function UserMenu() {
  const name = useSelector(getUserName);
  const email = useSelector(getUserEmail);
  const dispatch = useDispatch();

  return (
    <>
      <div className={s.box}>
        <button
          className={s.logout}
          onClick={() => dispatch(logOut())}
          type="button"
        >
          Log out
        </button>
        <p className={s.text}>{`Welcome, ${name}!`}</p>
        <p className={s.email}>{`(${email})`}</p>
      </div>
    </>
  );
}

export default UserMenu;
