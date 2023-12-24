import { FC } from "react";
import { Button } from "./ui/button";
import { ButtonType } from "@/utils/types";

const ButtonComponent: FC<ButtonType> = ({ value, type, onClick }) => {
  return (
    <Button type={type} onClick={onClick} className="w-full bg-slate-900 text-lg">
      {value}
    </Button>
  );
};

export default ButtonComponent;
