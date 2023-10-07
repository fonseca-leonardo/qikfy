import React from "react";
import styles from "./styles.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "outline" | "contained";
  color?: "success" | "error" | "primary" | "secondary" | "inherit";
}

function Button({
  children,
  variant = "contained",
  color = "primary",
  ...props
}: ButtonProps) {
  const styleKey = `${variant}-${color}`;
  return (
    <button className={`${styles.button} ${styles[styleKey]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
