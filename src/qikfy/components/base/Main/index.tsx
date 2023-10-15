"use client";

import React from "react";
import classNames from "classnames";
import { useDrawer } from "@/qikfy/hooks/useDrawer";

import styles from "./styles.module.css";

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
}

function Main({ className, children, container, ...props }: MainProps) {
  const { drawerState } = useDrawer();

  const drawerOpenStyle = container
    ? styles.drawerOpenContainer
    : styles.drawerOpen;

  const classes = classNames(
    className,
    styles.main,
    drawerState && drawerOpenStyle,
    container && styles.container
  );

  return (
    <main className={classes} {...props}>
      {children}
    </main>
  );
}

export default Main;
