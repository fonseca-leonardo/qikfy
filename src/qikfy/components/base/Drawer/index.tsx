"use client";

import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import { useDrawer } from "@/qikfy/hooks/useDrawer";
import Button from "../Button";
import Link from "../Link";

interface DrawerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  backLink?: {
    name: string;
    link: string;
  };
  children?: React.ReactNode;
}

function Drawer({ className, backLink, children, ...props }: DrawerProps) {
  const { drawerState } = useDrawer();

  const classes = classNames(
    styles.drawerContainer,
    !drawerState && styles.drawerClose,
    className
  );
  return (
    <div className={classes} {...props}>
      <div className={styles.drawerContent}>{children}</div>
      {backLink && (
        <Link
          href={backLink.link}
          className={styles.backButton}
          color="primary"
        >
          {backLink.name}
        </Link>
      )}
    </div>
  );
}

export default Drawer;
