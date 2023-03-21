import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface DeleteDialogProps extends DialogProps {
  onDeleteComponent: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  onDeleteComponent,
  onClose = () => {},
  ...props
}) => {
  return (
    <Dialog fullWidth onClose={onClose} {...props}>
      <DialogTitle>Excluir componente</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deseja realmente excluir o componente?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose({}, "escapeKeyDown")} color="warning">
          Cancelar
        </Button>
        <Button onClick={onDeleteComponent}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
