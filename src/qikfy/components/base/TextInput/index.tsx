import React, { forwardRef } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import Typography from "../Typography";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "contained" | "underlined";
  label?: string;
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { label, variant = "contained", required, error, className, ...props },
    ref
  ) {
    const classes = classNames(
      styles.container,
      error && styles.hasError,
      className
    );

    const inputClasses = classNames(
      styles.input,
      error && styles.hasError,
      styles[`input-${variant}`]
    );

    return (
      <div className={classes}>
        <Typography
          className={classNames(error && styles.hasError, styles.label)}
          type="label"
        >
          {required && "* "}
          {label}
        </Typography>
        <input className={inputClasses} ref={ref} {...props} />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

export default TextInput;
