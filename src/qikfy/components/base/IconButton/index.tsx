import React from "react";
import styles from "./styles.module.css";

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
  ...props
}: IconButtonProps) {
  const styleCompound: React.CSSProperties = {
    ...style,
    fontSize: size,
  };
  return (
    <button
      style={styleCompound}
      className={`${styles.button} ${styles[color]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
