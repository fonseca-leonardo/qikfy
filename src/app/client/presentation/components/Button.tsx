import React from "react";
import { Button as ButtonMUI, ButtonProps } from "@mui/material";
import { BuilderRegisterComponent } from "src/@types/builder";
import TextField from "@builder/base/components/inputs/TextField";
import RadioSelect from "@builder/base/components/inputs/RadioSelect";

interface Props extends ButtonProps {
  title: string;
}

const Button: React.FC<Props> = ({ title, ...props }) => {
  return (
    <ButtonMUI fullWidth onClick={() => alert("aqui")} {...props} draggable>
      {title}
    </ButtonMUI>
  );
};

export const ButtonRegister: BuilderRegisterComponent<Props> = {
  component: Button,
  name: "Botão",
  registerName: "button",
  defaultValues: {
    title: "Título",
    variant: "contained",
  },
  editor: [
    {
      Input: TextField,
      name: "title",
      label: "Título",
      required: true,
    },
    {
      Input: RadioSelect,
      name: "variant",
      label: "Variação",
      options: [
        {
          label: "Outlined",
          value: "outlined",
        },
        {
          label: "Text",
          value: "text",
        },
        {
          label: "Contained",
          value: "contained",
        },
      ],
    },
  ],
};

export default Button;
