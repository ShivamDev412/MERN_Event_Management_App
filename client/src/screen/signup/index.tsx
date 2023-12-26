import LoginImage from "@/assets/login_image.jpg";
import TextInput from "@/components/Input";
import { useSignup } from "./controller";
import ButtonComponent from "@/components/Button";
import OrDivider from "@/components/ui/orDivider";

function Signup() {
  const { signup, error, handleInputChange, handleSubmit } = useSignup();
  return (
    <section className="flex items-center justify-between h-screen p-4">
      <div className="w-full md:w-1/2 p-[2.5in]">
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
          />
          <TextInput
            id={"email"}
            name={"email"}
            type={"email"}
            value={signup.email}
            placeholder={"Email"}
            onChange={handleInputChange}
            error={error.email}
          />
          <TextInput
            id={"password"}
            name={"password"}
            type={"password"}
            value={signup.password}
            placeholder={"Password"}
            onChange={handleInputChange}
            error={error.password}
          />
          <TextInput
            id={"confirmPassword"}
            name={"confirmPassword"}
            type={"password"}
            value={signup.confirmPassword}
            placeholder={"Confirm Password"}
            onChange={handleInputChange}
            error={error.confirmPassword}
          />
          <ButtonComponent value="Signup" type="submit" />
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

export default Signup;
