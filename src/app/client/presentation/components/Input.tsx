import { BuilderRegisterComponent } from "src/@types/builder";
import React from "react";
import TextField from "@builder/base/components/inputs/TextField";

interface InputProps {
  placeholder?: string;
  title?: string;
}

function Input({ placeholder, title }: InputProps) {
  return (
    <div>
      {title && <label>{title}</label>}
      <input placeholder={placeholder} />
    </div>
  );
}

export const InputRegister: BuilderRegisterComponent<InputProps> = {
  component: Input,
  name: "Input",
  registerName: "input",
  defaultValues: {
    placeholder: "Default",
    title: "",
  },
  editor: [
    {
      Input: TextField,
      name: "placeholder",
      label: "Placeholder do input",
    },
  ],
};

export default Input;
