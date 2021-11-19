import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loading";
import {
  getUserName,
  getUserEmail,
  getAuthLoading,
} from "../../redux/auth/auth-selectors";
import { logOut } from "../../redux/auth/auth-operations";
import s from "./UserMenu.module.css";

function UserMenu() {
  const name = useSelector(getUserName);
  const email = useSelector(getUserEmail);
  const dispatch = useDispatch();

  const isLogOut = useSelector(getAuthLoading);

  return (
    <>
      {isLogOut && (
        <Loader
          className={"ContactsLoader"}
          type={"spinningBubbles"}
          color={"#2b2626"}
          height={20}
          width={20}
        />
      )}
      <p>{`Welcome, ${name}!`}</p>
      <p>{email}</p>
      <button onClick={() => dispatch(logOut())} type="button">
        Logout
      </button>
    </>
  );
}

export default UserMenu;
