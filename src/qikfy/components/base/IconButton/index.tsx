import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "success" | "error" | "primary" | "secondary" | "default" | "inherit";
  size?: number;
}

function IconButton({
  children,
  color = "default",
  size = 16,
  style,
  className,
  ...props
}: IconButtonProps) {
  const styleCompound: React.CSSProperties = {
    ...style,
    fontSize: size,
  };

  const classes = classNames(styles.button, styles[color], className);

  return (
    <button style={styleCompound} className={classes} {...props}>
      {children}
    </button>
  );
}

export default IconButton;
