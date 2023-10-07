import React, { useCallback } from "react";
import { FieldValues, RegisterOptions, useForm } from "react-hook-form";
import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import { registerComponentList } from "@/presentation/components";
import Dialog from "../base/Dialog";

import styles from "./styles.module.css";
import TextInput from "../base/TextInput";
import Button from "../base/Button";
import { QikfySelectedComponent } from "@/@types/builder";
import Typography from "../base/Typography";

interface ComponentEditorDialogProps {
  handleClose: () => void;
}

function ComponentEditorDialog({ handleClose }: ComponentEditorDialogProps) {
  const { selectedComponent, onComponentEdition } = useRenderEditor();
  const propsInputs = Object.keys(selectedComponent?.props || {});
  const values = () => {
    let obj: any = {};
    propsInputs.forEach((propName) => {
      const component = registerComponentList.find(
        (el) => el.registerName === selectedComponent?.registerName
      );

      const editor = component?.editor;

      obj[propName] = editor?.[propName].defaultValue;

      if (selectedComponent?.props[propName]) {
        obj[propName] = selectedComponent?.props[propName];
      }
    });

    return { props: obj, col: selectedComponent?.col };
  };

  const { register, handleSubmit, formState } = useForm<any>({
    values: values(),
  });

  const renderInput = (propName: string, index: number) => {
    const component = registerComponentList.find(
      (el) => el.registerName === selectedComponent?.registerName
    );

    if (!component) return null;

    const { editor } = component;

    const propPath = `props.${propName}`;

    const options: RegisterOptions<FieldValues, string> = {
      ...(editor[propName].required && {
        required: {
          message: "Campo obrigatório",
          value: true,
        },
      }),
    };

    return (
      <TextInput
        autoFocus={index === 0}
        key={propName}
        required={editor[propName].required}
        label={editor[propName].name}
        error={formState.errors[propPath]?.message as string}
        {...register(propPath, options)}
      />
    );
  };

  const submitForm = useCallback(
    ({ props, col }: any) => {
      if (!selectedComponent) return;

      const pageComponents: QikfySelectedComponent = {
        ...selectedComponent,
        props,
        col,
      };

      onComponentEdition(pageComponents);
    },
    [onComponentEdition, selectedComponent]
  );

  return (
    <Dialog
      title={`Editar - ${selectedComponent?.registerName}`}
      isOpen={!!selectedComponent}
      handleClose={() => handleClose()}
    >
      <form
        className={styles.componentEditorForm}
        onSubmit={handleSubmit(submitForm)}
      >
        {propsInputs.map((el, index) => renderInput(el, index))}
        <Typography type="h4">Tamanho</Typography>
        <TextInput
          required
          type="number"
          label="Tamanho XS"
          {...register("col.xs", {
            required: { message: "Campo obrigatório", value: true },
          })}
          error={formState.errors["col.xs"]?.message as string}
          max={12}
        />
        <TextInput
          required
          type="number"
          label="Tamanho SM"
          {...register("col.sm", {
            required: { message: "Campo obrigatório", value: true },
          })}
          error={formState.errors["col.sm"]?.message as string}
          max={12}
        />
        <TextInput
          required
          type="number"
          label="Tamanho MD"
          {...register("col.md", {
            required: { message: "Campo obrigatório", value: true },
          })}
          error={formState.errors["col.md"]?.message as string}
          max={12}
        />
        <TextInput
          required
          type="number"
          label="Tamanho LG"
          error={formState.errors["col.lg"]?.message as string}
          {...register("col.lg", {
            required: { message: "Campo obrigatório", value: true },
          })}
          max={12}
        />
        <TextInput
          required
          type="number"
          label="Tamanho XL"
          error={formState.errors["col.xl"]?.message as string}
          {...register("col.xl", {
            required: { message: "Campo obrigatório", value: true },
          })}
          max={12}
        />
        <div className={styles.modalButtons}>
          <Button variant="text" color="error" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default ComponentEditorDialog;
