import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../redux/auth/auth-selectors";

function PrivateRoute({ privatePage, publicUrl }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return isLoggedIn ? privatePage : <Navigate to={publicUrl} />;
}

export default PrivateRoute;
