import React, { useCallback, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { registerComponentsList } from "@components/register";

interface AddDialogProps extends DialogProps {
  onAddComponent: (value: string) => void;
}

const AddDialog: React.FC<AddDialogProps> = ({
  onClose = () => {},
  onAddComponent,
  ...props
}) => {
  const [componentSelectedState, setComponenteSelectedState] =
    useState<string>("");

  const handleComponentChange = useCallback((e: SelectChangeEvent<string>) => {
    setComponenteSelectedState(e.target.value);
  }, []);

  const handleClose = useCallback(() => {
    onClose({}, "escapeKeyDown");
    setComponenteSelectedState("");
  }, [onClose]);

  const handleAdd = useCallback(() => {
    handleClose();
    onAddComponent(componentSelectedState);
  }, [onAddComponent, componentSelectedState, handleClose]);

  return (
    <Dialog fullWidth onClose={handleClose} {...props}>
      <DialogTitle>Novo componente</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} marginTop={1}>
            <FormControl fullWidth>
              <InputLabel>Escolha um componente</InputLabel>
              <Select
                value={componentSelectedState}
                onChange={handleComponentChange}
                label="Escolha um componente"
              >
                {registerComponentsList.map((component) => (
                  <MenuItem
                    key={component.registerName}
                    value={component.registerName}
                  >
                    {component.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleAdd} disabled={!componentSelectedState}>
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
