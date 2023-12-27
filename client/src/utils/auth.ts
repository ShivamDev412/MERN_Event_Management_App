import Cookies from "js-cookie";
const useAuth = () => (Cookies.get("auth-token") ? true : false);
export default useAuth;
