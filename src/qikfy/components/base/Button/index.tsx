import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { QikfyColorsType } from "@/@types/builder";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  variant?: "text" | "outline" | "contained";
  color?: QikfyColorsType;
  href?: string;
}

function Button({
  children,
  className,
  variant = "contained",
  color = "primary",
  href,
  ...props
}: ButtonProps) {
  const styleKey = `${variant}-${color}`;

  const classes = classNames(
    styles.button,
    styles[styleKey],
    href && styles.buttonLink,
    styles,
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
