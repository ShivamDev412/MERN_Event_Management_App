import { useNavigate } from "react-router-dom";
import { PostApiCall } from "@/utils/api";
import { signupInitialState } from "@/utils/constant";
import { API_ENDPOINTS, API_TYPE, ENDPOINTS } from "@/utils/endpoints";
import { useState } from "react";
import Toast from "@/utils/toastMessage";


export const useSignup = () => {
  const navigation = useNavigate();
  const [signup, setSignup] = useState(signupInitialState);
  const [error, setError] = useState(signupInitialState);
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const res = await PostApiCall(`${API_TYPE.AUTH}${API_ENDPOINTS.SIGNUP}`, {
        name: signup.name,
        email: signup.email,
        password: signup.password,
        confirmPassword: signup.confirmPassword,
      });
      if (res.success) {
        Toast(res.message, "success")
        navigation(ENDPOINTS.LOGIN);
        setSignup(signupInitialState);
       
      } else {
        Toast(res.message, "error")
        setLoading(false);
      }
      
    } catch (error: any) {
      Toast(error.message, "success")
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return { signup, error, handleInputChange, handleSubmit, loading };
};
