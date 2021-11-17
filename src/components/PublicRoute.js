import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../redux/auth/auth-selectors";

function PublicRoute({ publicPage, privateUrl }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return isLoggedIn ? <Navigate to={privateUrl} /> : publicPage;
}

export default PublicRoute;
