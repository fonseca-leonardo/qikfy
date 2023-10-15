import React, { ReactHTML } from "react";
interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  type?: keyof ReactHTML;
}

function Typography({ type = "span", ...props }: TypographyProps) {
  return React.createElement(type, props);
}

export default Typography;
