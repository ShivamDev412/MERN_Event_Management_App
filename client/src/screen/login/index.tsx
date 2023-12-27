import TextInput from "@/components/Input";
import { useLogin } from "./controller";
import ButtonComponent from "@/components/Button";
import OrDivider from "@/components/ui/orDivider";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "@/utils/endpoints";
import AuthWrapper from "@/wrappers/AuthWrapper";

function Login() {
  const { login, error, handleInputChange, handleSubmit, loading } = useLogin();
  return (
    <AuthWrapper>
      <div className="w-full lg:w-1/2 lg:p-[0.5in] xl:p-[2.5in] md:w-1/2 justify-between mx-auto">
        <h1 className="text-center text-[3rem] my-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            id={"email"}
            name={"email"}
            type={"email"}
            value={login.email}
            placeholder={"Email"}
            onChange={handleInputChange}
            error={error.email}
            disabled={loading}
          />
          <TextInput
            id={"password"}
            name={"password"}
            type={"password"}
            value={login.password}
            placeholder={"Password"}
            onChange={handleInputChange}
            error={error.password}
            disabled={loading}
          />
          <ButtonComponent value="Login" type="submit" loading={loading} />
        </form>
        <div className="mt-2 flex justify-between">
          <p className="text-zinc-900">
            Don't have an account?{" "}
            <Link to={ENDPOINTS.SIGNUP} className="hover:underline">
              Signup
            </Link>
          </p>
          <Link to={"/"}>Forgot password</Link>
        </div>
        <OrDivider />
      </div>
    </AuthWrapper>
  );
}

export default Login;
