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
import { QikfyComponentModel } from "@/@types/builder";

interface ComponentAddDialogProps {
  handleClose: () => void;
}

function ComponentAddDialog({ handleClose }: ComponentAddDialogProps) {
  const { addSelectedComponent, onAddComponent, pageModel } = useRenderEditor();
  const { register, handleSubmit, reset, formState } = useForm({
    resetOptions: {
      keepValues: false,
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

  const handleCreateSubmit = useCallback(
    (data: any) => {
      if (!pageModel?.components) return;

      const pathToInsert = addSelectedComponent?.componentPath.split(".");
      const last = pathToInsert?.pop();
      const id = uuid();
      const prev = pathToInsert?.toString().replace(/\,/g, ".") || "";
      let [element] = _.at(pageModel?.components, prev);
      const obj: Record<string, QikfyComponentModel> = {};

      if (!element)
        element = pageModel.components as unknown as QikfyComponentModel;

      Object.keys(element).forEach((el) => {
        const key = prev ? `${prev}.` : "";

        obj[el] = {
          ..._.at(pageModel?.components, `${key}${el}`)[0],
        };

        if (el === last) {
          obj[id] = {
            id,
            col: {
              lg: 12,
              md: 12,
              sm: 12,
              xl: 12,
              xs: 12,
            },
            registerName,
            props: data.props,
          };
        }
      });

      reset();
      onAddComponent(obj, prev);
    },
    [
      addSelectedComponent?.componentPath,
      onAddComponent,
      pageModel?.components,
      registerName,
      reset,
    ]
  );

  const handleDiagloClose = useCallback(() => {
    setRegisterName("");
    reset();
    handleClose?.();
  }, [handleClose, reset]);

  return (
    <Dialog
      title={`Adicionar componente - ${addSelectedComponent?.registerName}`}
      isOpen={!!addSelectedComponent}
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
        {renderInputs()}
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

export default ComponentAddDialog;
