import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { DEFAULT_FIELD_SIZE, DEFAULT_FIELD_VARIANT } from "../../constants/globalConstant";

const DynaTextField = ({ 
  control, 
  name, 
  label, 
  props, 
  InputProps,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => {
        if(!value) value=''
        return (
        <TextField
          fullWidth
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          variant={DEFAULT_FIELD_VARIANT}
          size={DEFAULT_FIELD_SIZE}
          InputProps={InputProps}
          {...props}
        />
      )}}
    />
  );
};

export default DynaTextField