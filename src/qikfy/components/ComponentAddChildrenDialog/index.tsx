import React, { useCallback, useEffect, useState } from "react";
import Dialog from "../base/Dialog";
import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import styles from "./styles.module.css";
import Button from "../base/Button";
import Select from "../base/Select";
import { registerComponentList } from "@/presentation/components";
import { FieldValues, RegisterOptions, useForm } from "react-hook-form";
import TextInput from "../base/TextInput";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import BreakpointInputs from "../base/BreakpointInputs";

interface ComponentAddChildrenDialogProps {
  handleClose: () => void;
}

function ComponentAddChildrenDialog({
  handleClose,
}: ComponentAddChildrenDialogProps) {
  const { addSelectedComponentChildren, onAddComponentChildren } =
    useRenderEditor();
  const { register, handleSubmit, reset, formState } = useForm<any>({
    resetOptions: {
      keepValues: false,
    },
    defaultValues: {
      col: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
      },
    },
  });
  const componentPicker = registerComponentList.map((el) => ({
    value: el.registerName,
    name: el.registerName,
  }));
  const [registerName, setRegisterName] = useState("");

  const component = registerComponentList.find(
    (el) => el.registerName === registerName
  );
  const propsInputs = Object.keys(component?.editor || {});

  const renderInputs = useCallback(() => {
    return propsInputs.map((propName, index) => {
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

      const fieldName = `props.${propName}`;

      return (
        <TextInput
          autoFocus={index === 0}
          key={propName}
          required={editor[propName].required}
          label={editor[propName].name}
          error={formState.errors[fieldName]?.message as string}
          {...register(fieldName, options)}
        />
      );
    });
  }, [propsInputs, component, formState.errors, register]);

  const handleDiagloClose = useCallback(() => {
    setRegisterName("");
    reset();
    handleClose?.();
  }, [handleClose, reset]);

  const handleCreateSubmit = useCallback(
    (data: any) => {
      onAddComponentChildren({
        col: data.col,
        props: data.props,
        componentPath: addSelectedComponentChildren?.componentPath || "",
        id: uuid(),
        registerName,
      });

      handleDiagloClose();
    },
    [
      addSelectedComponentChildren?.componentPath,
      handleDiagloClose,
      onAddComponentChildren,
      registerName,
    ]
  );

  return (
    <Dialog
      title={`Adicionar filho ao componente`}
      isOpen={!!addSelectedComponentChildren}
      handleClose={handleDiagloClose}
    >
      <Select
        options={componentPicker}
        label="Escolha um componente"
        autoFocus
        onChange={(e) => {
          setRegisterName(e.target.value);
          reset();
        }}
      />
      <form
        className={styles.componentEditorForm}
        onSubmit={handleSubmit(handleCreateSubmit)}
      >
        {registerName && (
          <>
            {renderInputs()}
            <BreakpointInputs formState={formState} register={register} />
          </>
        )}
        <div className={styles.modalButtons}>
          <Button variant="text" color="error" onClick={handleDiagloClose}>
            Fechar
          </Button>
          <Button variant="contained" type="submit">
            Criar
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default ComponentAddChildrenDialog;
