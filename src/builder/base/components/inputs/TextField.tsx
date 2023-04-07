import { BuilderInputProps } from "src/@types/builder";
import React from "react";
import { Controller } from "react-hook-form";
import { TextField as MUITextField } from "@mui/material";

interface TextFieldProps extends BuilderInputProps {}

const TextField: React.FC<TextFieldProps> = ({
  control,
  name,
  label,
  required,
  placeholder,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <MUITextField
          {...field}
          required={required}
          name={name}
          fullWidth
          label={label}
          placeholder={placeholder}
          margin="dense"
        />
      )}
    />
  );
};

export default TextField;
