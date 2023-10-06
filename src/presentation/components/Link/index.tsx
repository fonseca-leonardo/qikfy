import { QikfyComponentExporter } from "@/@types/builder";
import React, { forwardRef } from "react";

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { title, ...props },
  ref
) {
  return (
    <a ref={ref} {...props}>
      {title}
    </a>
  );
});

export const linkExporter: QikfyComponentExporter = {
  element: Link,
  registerName: "link",
  editor: {
    title: {
      name: "Texto do link",
      type: "text",
      required: true,
    },
    href: {
      name: "Link",
      type: "text",
      required: true,
    },
  },
};

export default Link;
