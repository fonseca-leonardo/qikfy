import React from "react";
import Typography from "../Typography";
import TextInput from "../TextInput";
import { FormState, UseFormRegister, useForm } from "react-hook-form";

interface BreakpointInputsProps {
  register: UseFormRegister<any>;
  formState: FormState<any>;
}

function BreakpointInputs({ register, formState }: BreakpointInputsProps) {
  return (
    <>
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
    </>
  );
}

export default BreakpointInputs;
