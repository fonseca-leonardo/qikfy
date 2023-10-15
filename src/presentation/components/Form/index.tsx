import { QikfyComponentExporter } from "@/@types/builder";
import ChildrenContainer from "@/qikfy/components/base/ChildrenContainer";
import React, { forwardRef } from "react";

interface FormProps {
  children?: React.ReactNode;
  componentPath: string;
}

const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { children, componentPath, ...props },
  ref
) {
  return (
    <form ref={ref} {...props}>
      <ChildrenContainer componentPath={componentPath}>
        {children}
      </ChildrenContainer>
    </form>
  );
});

export const formExporter: QikfyComponentExporter = {
  element: Form,
  registerName: "form",
  hasChildren: true,
  editor: {},
};

export default Form;
