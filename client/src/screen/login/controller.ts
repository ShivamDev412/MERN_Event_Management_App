import { PostApiCall } from "@/utils/api";
import { loginInitialState } from "@/utils/constant";
import { API_ENDPOINTS, API_TYPE, ENDPOINTS } from "@/utils/endpoints";
import Toast from "@/utils/toastMessage";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigation = useNavigate();

  const [login, setLogin] = useState(loginInitialState);
  const [error, setError] = useState(loginInitialState);
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const res = await PostApiCall(`${API_TYPE.AUTH}${API_ENDPOINTS.LOGIN}`, {
        email: login.email,
        password: login.password,
      });
      if (res.success) {
        Toast(res.message, "success");
       
        Cookies.set("auth-token", res.token, { expires: 7 });
        debugger;
        navigation(ENDPOINTS.HOME);
        setLogin(loginInitialState);
      } else {
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
  return { login, error, handleInputChange, handleSubmit, loading };
};
