import { QikfyComponentExporter } from "@/@types/builder";
import React, { forwardRef } from "react";

interface ButtonProps {
  title: string;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { title, children, ...props },
  ref
) {
  return (
    <button ref={ref} {...props}>
      {title}
    </button>
  );
});

export const buttonExporter: QikfyComponentExporter = {
  element: Button,
  registerName: "button",
  editor: {
    title: {
      name: "Texto do botão",
      type: "text",
      required: true,
      defaultValue: "Botão",
    },
  },
};

export default Button;
