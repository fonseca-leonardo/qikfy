import React from "react";
import Link from "../Link";
import Typography from "../Typography";
import styles from "./styles.module.css";
import IconButton from "../IconButton";
import { MdDelete } from "react-icons/md";

interface CardProps {
  title: string;
  subtitle?: string;
  linkTitle?: string;
  linkHref?: string;
  onDelete?: () => void;
}

function NavigationCard({
  title,
  subtitle,
  linkHref = "",
  linkTitle,
  onDelete,
}: CardProps) {
  return (
    <div className={styles.container}>
      <IconButton
        onClick={onDelete}
        className={styles.deleteButton}
        color="error"
      >
        <MdDelete />
      </IconButton>
      <div className={styles.titleContainer}>
        <Typography type="h4">{title}</Typography>
        <Typography type="small">{subtitle}</Typography>
      </div>
      <div>
        <Link href={linkHref}>{linkTitle}</Link>
      </div>
    </div>
  );
}

export default NavigationCard;
