import React, { useCallback } from "react";
import Dialog from "../base/Dialog";
import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import Typography from "../base/Typography";
import Button from "../base/Button";
import styles from "./styles.module.css";

interface ComponentDeleteDialog {
  handleClose: () => void;
}

function ComponentDeleteDialog({ handleClose }: ComponentDeleteDialog) {
  const { deleteComponent, onConfirmDeleteComponent } = useRenderEditor();

  const handleConfirm = useCallback(() => {
    if (!deleteComponent) return;
    onConfirmDeleteComponent(deleteComponent);
  }, [deleteComponent, onConfirmDeleteComponent]);

  return (
    <Dialog
      title={`Apagar - ${deleteComponent?.registerName}`}
      handleClose={handleClose}
      isOpen={!!deleteComponent}
    >
      <Typography>Deseja realmente excluir?</Typography>
      <div className={styles.modalButtons}>
        <Button variant="text" color="error" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confimar
        </Button>
      </div>
    </Dialog>
  );
}

export default ComponentDeleteDialog;
