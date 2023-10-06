import React, { useCallback, useEffect, useMemo } from "react";
import { FieldValues, RegisterOptions, useForm } from "react-hook-form";
import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import { registerComponentList } from "@/presentation/components";
import Dialog from "../base/Dialog";

import styles from "./styles.module.css";
import TextInput from "../base/TextInput";
import Button from "../base/Button";
import accessNested from "@/qikfy/utils/accessNested";
import { QikfySelectedComponent } from "@/@types/builder";

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
    return obj;
  };

  const { register, handleSubmit, formState } = useForm({
    values: values(),
  });

  const renderInput = (propName: string, index: number) => {
    const component = registerComponentList.find(
      (el) => el.registerName === selectedComponent?.registerName
    );

    if (!component) return null;

    const { editor } = component;

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
        error={formState.errors[propName]?.message as string}
        {...register(propName, options)}
      />
    );
  };

  const submitForm = useCallback(
    (data: any) => {
      if (!selectedComponent) return;

      const pageComponents: QikfySelectedComponent = {
        ...selectedComponent,
        props: data,
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
