import TextInput from "@/components/Input";
import { useSignup } from "./controller";
import ButtonComponent from "@/components/Button";
import OrDivider from "@/components/ui/orDivider";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "@/utils/endpoints";
import AuthWrapper from "@/wrappers/AuthWrapper";

function Signup() {
  const { signup, error, handleInputChange, handleSubmit, loading } =
    useSignup();
  return (
    <AuthWrapper>
      <div className="w-full lg:w-1/2 lg:p-[0.5in] xl:p-[2.5in] md:w-1/2 justify-between mx-auto">
        <h1 className="text-center text-[3rem] my-4">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            id={"name"}
            name={"name"}
            type={"text"}
            value={signup.name}
            placeholder={"Name"}
            onChange={handleInputChange}
            error={error.name}
            disabled={loading}
          />
          <TextInput
            id={"email"}
            name={"email"}
            type={"email"}
            value={signup.email}
            placeholder={"Email"}
            onChange={handleInputChange}
            error={error.email}
            disabled={loading}
          />
          <TextInput
            id={"password"}
            name={"password"}
            type={"password"}
            value={signup.password}
            placeholder={"Password"}
            onChange={handleInputChange}
            error={error.password}
            disabled={loading}
          />
          <TextInput
            id={"confirmPassword"}
            name={"confirmPassword"}
            type={"password"}
            value={signup.confirmPassword}
            placeholder={"Confirm Password"}
            onChange={handleInputChange}
            error={error.confirmPassword}
            disabled={loading}
          />
          <ButtonComponent value="Signup" type="submit" loading={loading} />
        </form>
        <div className="mt-2">
          <p className="text-zinc-900">
            Already have an account?{" "}
            <Link to={ENDPOINTS.LOGIN} className="hover:underline">
              Login
            </Link>
          </p>
        </div>
        <OrDivider />
      </div>
    </AuthWrapper>
  );
}

export default Signup;
