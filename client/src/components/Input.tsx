import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { InputType } from "@/utils/types";
import { FC, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

const TextInput: FC<InputType> = ({
  id,
  name,
  value,
  onChange,
  type,
  placeholder,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isFocused]);

  return (
    <div className="w-full flex flex-col gap-1 my-3">
      {type === "password" ? (
        <div
          ref={inputRef}
          className={`flex h-10 w-full rounded-md border items-center ${
            isFocused ? "border-blue-500 border-2" : "border-input"
          } bg-background px-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <input
            className="border-0 outline-none w-[95%] h-full text-lg placeholder:text-muted-foreground"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            maxLength={20}
          />
          {showPassword ? (
            <IoEye className="h-5 w-5" onClick={togglePasswordVisibility} />
          ) : (
            <IoEyeOff className="h-5 w-5" onClick={togglePasswordVisibility} />
          )}
        </div>
      ) : (
        <Input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
        />
      )}
      {error !== "" && <p className="text-red-600 italic">{error}</p>}
    </div>
  );
};

export default TextInput;
