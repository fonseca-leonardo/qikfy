import SliderField from "@builder/base/components/inputs/SliderField";
import { registerRecord } from "@components/register";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import { BuilderComponentColumns } from "src/@types/builder";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

interface EditDialogProps extends DialogProps {
  componentName: string;
  registerName: string;
  componentProps: any;
  col: BuilderComponentColumns;
  onSubmit: (data: any) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({
  componentName,
  registerName,
  componentProps,
  col,
  onClose = () => {},
  onSubmit,
  ...dialogProps
}) => {
  const [tabValueState, setTabValueState] = useState("component");
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { ...componentProps, col },
  });
  const { editor } = registerRecord()[registerName];

  const handleEditorSubmit = useCallback(
    (data: any) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  return (
    <Dialog
      fullWidth
      onClose={() => {
        reset();
        onClose({}, "escapeKeyDown");
      }}
      {...dialogProps}
    >
      <form onSubmit={handleSubmit(handleEditorSubmit)}>
        <DialogTitle>Editando: {componentName}</DialogTitle>
        <Tabs
          variant="fullWidth"
          value={tabValueState}
          onChange={(_el, value) => setTabValueState(value)}
        >
          <Tab label="Componente" value="component" />
          <Tab label="Padrão" value="default" />
          <Tab label="Integração" value="integration" />
        </Tabs>
        <DialogContent>
          <Grid container spacing={1}>
            {tabValueState === "component" &&
              editor.map(({ Input, name, ...props }) => (
                <Grid item xs={12} key={name}>
                  <Input control={control} name={name} {...props} />
                </Grid>
              ))}
            {tabValueState === "default" && (
              <>
                <Grid item xs={12}>
                  <SliderField
                    control={control}
                    name="col.xs"
                    label="xs"
                    min={1}
                    max={12}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SliderField
                    name="col.sm"
                    control={control}
                    label="sm"
                    min={1}
                    max={12}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SliderField
                    name="col.md"
                    control={control}
                    label="md"
                    min={1}
                    max={12}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SliderField
                    name="col.lg"
                    control={control}
                    label="lg"
                    min={1}
                    max={12}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SliderField
                    name="col.xl"
                    control={control}
                    label="xl"
                    min={1}
                    max={12}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="warning"
            onClick={() => {
              onClose({}, "escapeKeyDown");
              reset();
            }}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDialog;
