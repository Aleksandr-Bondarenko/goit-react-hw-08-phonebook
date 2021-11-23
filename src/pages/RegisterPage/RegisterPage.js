import { useLocation } from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";

function RegisterPage() {
  const location = useLocation();

  return <UserForm url={location.pathname} />;
}

export default RegisterPage;
