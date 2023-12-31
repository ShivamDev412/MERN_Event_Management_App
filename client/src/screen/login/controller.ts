import { PostApiCall } from "@/utils/api";
import { loginInitialState } from "@/utils/constant";
import { API_ENDPOINTS, API_TYPE, ENDPOINTS } from "@/utils/endpoints";
import Toast from "@/utils/toastMessage";
import { loginValidation } from "@/utils/validation";
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors } = loginValidation(login, loginInitialState);
    setError(errors);
    if (!isValid) return;
    try {
      setLoading(true);
      const res = await PostApiCall(`${API_TYPE.AUTH}${API_ENDPOINTS.LOGIN}`, {
        email: login.email,
        password: login.password,
      });
      if (res.success) {
        Toast(res.message, "success");

        Cookies.set("auth-token", res.token, { expires: 7 });
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
