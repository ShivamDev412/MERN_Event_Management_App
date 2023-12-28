export type InputType = {
  id: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  disabled?: boolean;
};
export type ButtonType = {
  value: string;
  type: "submit" | "button";
  onClick?: () => void;
  loading?: boolean;
};
export type SignupType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type LoginType = {
  email: string;
  password: string;
};
