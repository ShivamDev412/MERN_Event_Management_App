import { useNavigate } from "react-router-dom";
import { PostApiCall } from "@/utils/api";
import { signupInitialState } from "@/utils/constant";
import { API_ENDPOINTS, API_TYPE, ENDPOINTS } from "@/utils/endpoints";
import { useState } from "react";
import Toast from "@/utils/toastMessage";
import Cookies from "js-cookie";
import { signupValidation } from "@/utils/validation";

export const useSignup = () => {
  const navigation = useNavigate();
  const [signup, setSignup] = useState(signupInitialState);
  const [error, setError] = useState(signupInitialState);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors } = signupValidation(signup, signupInitialState);
    setError(errors);
    if (!isValid) return;
    try {
      setLoading(true);
      const res = await PostApiCall(`${API_TYPE.AUTH}${API_ENDPOINTS.SIGNUP}`, {
        name: signup.name,
        email: signup.email,
        password: signup.password,
        confirmPassword: signup.confirmPassword,
      });
      if (res.success) {
        Toast(res.message, "success");
        Cookies.set("auth-token", res.token, { expires: 7 });
        navigation(ENDPOINTS.HOME);
        setSignup(signupInitialState);
      } else {
        if (res.message === "Validation error") {
          setError(res.errors);
          return;
        }
        Toast(res.message, "error");
        setLoading(false);
      }
    } catch (error: any) {
      Toast(error.message, "success");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return { signup, error, handleInputChange, handleSubmit, loading };
};
