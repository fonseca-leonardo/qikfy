import React, { forwardRef } from "react";
import { QikfyComponentExporter } from "@/@types/builder";
import ChildrenContainer from "@/qikfy/components/base/ChildrenContainer";

interface ContainerProps {
  title: string;
  children: React.ReactNode;
  componentPath: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { title, children, componentPath, ...props },
  ref
) {
  return (
    <>
      <section ref={ref} {...props}>
        <span>{title}</span>
        <ChildrenContainer componentPath={componentPath}>
          {children}
        </ChildrenContainer>
      </section>
    </>
  );
});

export const containerExporter: QikfyComponentExporter = {
  element: Container,
  registerName: "container",
  hasChildren: true,
  editor: {
    title: {
      type: "text",
      required: true,
      name: "Texto dentro do container",
    },
  },
};

export default Container;
