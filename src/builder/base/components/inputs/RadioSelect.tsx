import { BuilderInputProps } from "src/@types/builder";
import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface RadioSelectProps extends BuilderInputProps {}

const RadioSelect: React.FC<RadioSelectProps> = ({
  control,
  name,
  label,
  options,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            row
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            value={field.value}
          >
            {options?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={option.label}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default RadioSelect;
