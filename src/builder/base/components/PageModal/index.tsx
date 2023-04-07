import { CreatePageRequest } from "@builder/services/PageService/PageService.types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "../inputs/TextField";

interface PageModalProps {
  open: boolean;
  page: CreatePageRequest | null;
  onClose: () => void;
  onSubmit: (data: CreatePageRequest) => Promise<void> | void;
}

function PageModal({ open, page, onClose, onSubmit }: PageModalProps) {
  const { control, handleSubmit, reset } = useForm<CreatePageRequest>({
    defaultValues: {
      pagePath: page?.pagePath ?? "",
      title: page?.title ?? "",
    },
  });

  useEffect(() => {
    reset({ ...page });
  }, [page, reset]);

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const handlePageSubmit = useCallback(
    async (form: CreatePageRequest) => {
      await onSubmit(form);
      handleClose();
    },
    [onSubmit, handleClose]
  );

  return (
    <Dialog
      fullWidth
      keepMounted={false}
      open={open}
      onClose={() => handleClose()}
    >
      <form onSubmit={handleSubmit(handlePageSubmit)}>
        <DialogTitle>Criar página</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            <TextField
              name="title"
              control={control}
              label="Título"
              placeholder="Ex: Home"
            />
            <TextField
              name="pagePath"
              control={control}
              label="Caminho da página"
              placeholder="Ex: /home"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Voltar
          </Button>
          <Button type="submit">Criar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PageModal;
