import { useDispatch, useSelector } from "react-redux";
import { getUserName, getUserEmail } from "../../redux/auth/auth-selectors";
import { logOut } from "../../redux/auth/auth-operations";

function UserMenu() {
  const name = useSelector(getUserName);
  const email = useSelector(getUserEmail);
  const dispatch = useDispatch();

  return (
    <>
      <p>{`Welcome, ${name}!`}</p>
      <p>{email}</p>
      <button onClick={() => dispatch(logOut())} type="button">
        Logout
      </button>
    </>
  );
}

export default UserMenu;
