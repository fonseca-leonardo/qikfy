import React from "react";
import styles from "./styles.module.css";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "success" | "error" | "primary" | "secondary" | "default";
}

function IconButton({
  children,
  color = "default",
  ...props
}: IconButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]}`} {...props}>
      {children}
    </button>
  );
}

export default IconButton;
