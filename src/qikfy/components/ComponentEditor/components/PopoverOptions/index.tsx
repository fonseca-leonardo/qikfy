import React, { forwardRef } from "react";
import styles from "./styles.module.css";
import { MdModeEdit, MdAdd, MdDelete } from "react-icons/md";
import IconButton from "@/qikfy/components/base/IconButton";

interface PopoverOptions {
  onOpenEdit?: () => void;
  onOpenAdd?: () => void;
  onDelete?: () => void;
}

const PopoverOptions = forwardRef<HTMLDivElement, PopoverOptions>(
  function PopoverOptions({ onOpenAdd, onOpenEdit, onDelete }, ref) {
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      e.persist();

      onOpenEdit?.();
    };

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      e.persist();

      onOpenAdd?.();
    };

    const handleDelete = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      e.stopPropagation();
      e.persist();

      onDelete?.();
    };

    return (
      <div
        ref={ref}
        className={styles.popcontainer}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton onClick={handleEdit}>
          <MdModeEdit />
        </IconButton>
        <hr />
        <IconButton onClick={handleAdd}>
          <MdAdd />
        </IconButton>
        <hr />
        <IconButton>
          <MdDelete onClick={handleDelete} />
        </IconButton>
      </div>
    );
  }
);

export default PopoverOptions;
