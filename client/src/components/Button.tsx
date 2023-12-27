import { FC } from "react";
import { Button } from "./ui/button";
import { ButtonType } from "@/utils/types";
const ButtonComponent: FC<ButtonType> = ({ value, type, onClick, loading }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full bg-slate-900 text-lg flex justify-center items-center disabled:cursor-wait"
    >
      {value}
    </Button>
  );
};

export default ButtonComponent;
