import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { QikfyColorsType } from "@/@types/builder";
import classNames from "classnames";
import styles from "./styles.module.css";

interface LinkProps extends NextLinkProps {
  color?: QikfyColorsType;
  children?: React.ReactNode;
  className?: string;
}

function Link({ href, className, color = "primary", ...props }: LinkProps) {
  const classes = classNames(styles.link, styles[`link-${color}`], className);
  return <NextLink className={classes} href={href} {...props} />;
}

export default Link;
