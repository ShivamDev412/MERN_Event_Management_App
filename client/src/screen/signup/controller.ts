import { signupInitialState } from "@/utils/constant";
import { useState } from "react";

export const useSignup = () => {
  const [signup, setSignup] = useState(signupInitialState);
  const [error, setError] = useState(signupInitialState);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let isValid = true;
    const errors = { ...signupInitialState };
    if (!signup.name) {
      errors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z-' ]+$/.test(signup.name)) {
      errors.name = "Name should only contain alphanumeric characters";
      isValid = false;
    }
    if (!signup.email) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!signup.password) {
      errors.password = "Password is required";
      isValid = false;
    }
    if (!signup.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (signup.password !== signup.confirmPassword) {
      errors.confirmPassword = "Password and confirm password do not match";
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
  return { signup, error, handleInputChange, handleSubmit };
};
