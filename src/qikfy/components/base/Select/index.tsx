import React, { forwardRef } from "react";
import styles from "./styles.module.css";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{
    value: string;
    name: string;
  }>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, label, error, ...props },
  ref
) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select className={styles.input} ref={ref} {...props}>
        <option></option>
        {options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.name}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
});

export default Select;
