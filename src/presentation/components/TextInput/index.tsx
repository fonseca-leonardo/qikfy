import { QikfyComponentExporter } from "@/@types/builder";
import React, { forwardRef } from "react";

interface TextInputProps {
  children: React.ReactNode;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ children, ...props }, ref) {
    return <input ref={ref} {...props} />;
  }
);

export const textInputExporter: QikfyComponentExporter = {
  element: TextInput,
  registerName: "textInput",
  hasChildren: false,
  editor: {
    name: {
      name: "Nome do input",
      type: "text",
      required: true,
    },
    placeholder: {
      name: "Placeholder do input",
      type: "text",
      required: false,
    },
  },
};

export default TextInput;
