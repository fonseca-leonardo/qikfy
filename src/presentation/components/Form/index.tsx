import { QikfyComponentExporter } from "@/@types/builder";
import React, { forwardRef } from "react";

interface FormProps {
  children?: React.ReactNode;
}

const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { children, ...props },
  ref
) {
  return (
    <form ref={ref} {...props}>
      {children}
    </form>
  );
});

export const formExporter: QikfyComponentExporter = {
  element: Form,
  registerName: "form",
  editor: {},
};

export default Form;
