import React, { forwardRef } from "react";
import { QikfyComponentExporter } from "@/@types/builder";

interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { title, children, ...props },
  ref
) {
  return (
    <section ref={ref} {...props}>
      <span>{title}</span>
      <div>{children}</div>
    </section>
  );
});

export const containerExporter: QikfyComponentExporter = {
  element: Container,
  registerName: "container",
  editor: {
    title: {
      type: "text",
      required: true,
      name: "Texto dentro do container",
    },
  },
};

export default Container;
