// import { useState, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
// import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";

function RegisterPage() {
  const location = useLocation();

  return <UserForm url={location.pathname} />;
}

export default RegisterPage;
