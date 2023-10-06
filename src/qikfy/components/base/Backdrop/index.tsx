import styles from "./styles.module.css";

import React from "react";

interface BackdropProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function Backdrop({ children, onClick }: BackdropProps) {
  return (
    <div className={styles.backdrop} onClick={onClick}>
      {children}
    </div>
  );
}

export default Backdrop;
