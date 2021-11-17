import { useLocation } from "react-router-dom";

import UserForm from "../../components/UserForm/UserForm";

function LoginPage() {
  const location = useLocation();

  return <UserForm url={location.pathname} />;
}

export default LoginPage;
