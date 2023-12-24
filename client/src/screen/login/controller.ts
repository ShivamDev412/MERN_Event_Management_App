import { loginInitialState } from "@/utils/constant";
import { useState } from "react";

export const useLogin = () => {
  const [login, setLogin] = useState(loginInitialState);
  const [error, setError] = useState(loginInitialState);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let isValid = true;
    const errors = { ...loginInitialState };
    if (!login.email) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!login.password) {
      errors.password = "Password is required";
      isValid = false;
    }
    setError(errors);
    return isValid;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    return;
  };
  return { login, error, handleInputChange, handleSubmit };
};
