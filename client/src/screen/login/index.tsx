import LoginImage from "@/assets/login_image.jpg";
import TextInput from "@/components/Input";
import { useLogin } from "./controller";
import ButtonComponent from "@/components/Button";
import OrDivider from "@/components/ui/orDivider";

function Login() {
  const { login, error, handleInputChange, handleSubmit } = useLogin();
  return (
    <section className="flex items-center justify-between h-screen p-4">
      <div className="w-full md:w-1/2 p-[2.5in]">
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
          />
          <TextInput
            id={"password"}
            name={"password"}
            type={"password"}
            value={login.password}
            placeholder={"Password"}
            onChange={handleInputChange}
            error={error.password}
          />
          <ButtonComponent value="Login" type="submit" />
        </form>
        {/* <OrDivider /> */}
      </div>
      <div className="hidden md:block w-1/2 h-full">
        <img
          src={LoginImage}
          alt="login_image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
}

export default Login;
