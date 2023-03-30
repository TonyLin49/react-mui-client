import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DEFAULT_FIELD_SIZE, DEFAULT_FIELD_VARIANT } from "../../constants/globalConstant";

const DynaPasswordField = ({ name, control, label, props }) => {
    const [showPassword, setShowPassword] = useState(false)
  return (<form>
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size={DEFAULT_FIELD_SIZE}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant={DEFAULT_FIELD_VARIANT}
          {...props}
          type={showPassword ? 'text' : 'password'}
          autoComplete={name}
          InputProps={{
            endAdornment: (
                <InputAdornment
                    position='end'
                >
                    <IconButton onClick={()=>setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            )
        }}
        />
      )}
    />
  </form>);
};

export default DynaPasswordField