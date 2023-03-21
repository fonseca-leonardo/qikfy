import { BuilderInputProps } from "src/@types/builder";
import React from "react";
import { Controller } from "react-hook-form";
import { Box, Slider, Typography } from "@mui/material";

interface SliderFieldProps extends BuilderInputProps {
  min?: number;
  max?: number;
}

const SliderField: React.FC<SliderFieldProps> = ({
  control,
  name,
  label,
  max,
  min,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box>
          {label && <Typography variant="button">{label}</Typography>}
          <Slider
            {...field}
            value={field.value}
            onChange={(_, value) => field.onChange(Number(value))}
            min={min}
            max={max}
            valueLabelDisplay="auto"
          />
        </Box>
      )}
    />
  );
};

export default SliderField;
