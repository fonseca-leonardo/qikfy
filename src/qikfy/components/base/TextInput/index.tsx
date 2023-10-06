import React, { forwardRef } from "react";
import styles from "./styles.module.css";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ label, required, error, ...props }, ref) {
    return (
      <div className={styles.container}>
        <label>
          {required && "* "}
          {label}
        </label>
        <input className={styles.input} ref={ref} {...props} />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

export default TextInput;
