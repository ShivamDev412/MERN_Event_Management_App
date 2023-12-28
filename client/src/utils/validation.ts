import { LoginType, SignupType } from "./types";

export const signupValidation = (
  signup: SignupType,
  signupInitialState: SignupType
) => {
  let isValid = true;
  const errors = { ...signupInitialState };
  if (!signup.name) {
    errors.name = "Name is required";
    isValid = false;
  } else if (!/^[a-zA-Z-' ]+$/.test(signup.name)) {
    errors.name = "Name should only contain letters and spaces";
    isValid = false;
  }
  if (!signup.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(signup.email)) {
    errors.email = "Invalid email address";
    isValid = false;
  }
  if (!signup.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,20}$/.test(
      signup.password
    )
  ) {
    errors.password =
      "Password must be between 6 and 20 characters and include at least one uppercase letter, one lowercase letter, and one special character";
    isValid = false;
  }
  if (!signup.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
    isValid = false;
  } else if (signup.password !== signup.confirmPassword) {
    errors.confirmPassword = "Password and confirm password do not match";
    isValid = false;
  }
  return {
    isValid,
    errors,
  };
};
export const loginValidation = (
  login: LoginType,
  loginInitialState: LoginType
) => {
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
  return {
    isValid,
    errors,
  };
};
