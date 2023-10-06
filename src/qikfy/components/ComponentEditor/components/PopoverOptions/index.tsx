import React, { forwardRef } from "react";
import styles from "./styles.module.css";
import { MdModeEdit, MdAdd } from "react-icons/md";
import IconButton from "@/qikfy/components/base/IconButton";

interface PopoverOptions {
  onOpenEdit?: () => void;
  onOpenAdd?: () => void;
}

const PopoverOptions = forwardRef<HTMLDivElement, PopoverOptions>(
  function PopoverOptions({ onOpenAdd, onOpenEdit }, ref) {
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      e.persist();

      onOpenEdit?.();
    };

    return (
      <div ref={ref} className={styles.popcontainer}>
        <IconButton onClick={handleEdit}>
          <MdModeEdit />
        </IconButton>
        <hr />
        <IconButton onClick={onOpenAdd}>
          <MdAdd />
        </IconButton>
      </div>
    );
  }
);

export default PopoverOptions;
