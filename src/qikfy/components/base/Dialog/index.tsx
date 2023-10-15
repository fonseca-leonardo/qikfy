"use client";

import React, { useEffect } from "react";
import ReactPortal from "../ReactPortal";
import Backdrop from "../Backdrop";
import styles from "./styles.module.css";
import Button from "../Button";

interface DialogProps {
  children: React.ReactNode;
  title: string;
  isOpen?: boolean;
  handleClose?: () => void;
}

function Dialog({ children, isOpen, title, handleClose }: DialogProps) {
  // useEffect(() => {
  //   const closeOnEscapeKey = (e: KeyboardEvent) => {
  //     console.log(e.key);
  //     if (e.key === "Escape") {
  //       handleClose?.();
  //     }
  //   };
  //   document.body.addEventListener("keydown", closeOnEscapeKey);

  //   return () => {
  //     document.body.removeEventListener("keydown", closeOnEscapeKey);
  //   };
  // }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <Backdrop>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{title}</h3>
            <div>{children}</div>
          </div>
        </div>
      </Backdrop>
    </ReactPortal>
  );
}

export default Dialog;
