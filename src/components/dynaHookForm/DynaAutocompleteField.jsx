import { 
    Autocomplete, 
    FormControl, 
    TextField  
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { 
    DEFAULT_FIELD_SIZE, 
    DEFAULT_FIELD_VARIANT 
} from "../../constants/globalConstant";

const DynaAutocompleteField = ({
  name,
  control,
  label,
  options,
  setSelectedFC,
  props,
  multiple
}) => {
  if(!options) {
    options = []
  } 
  options = [{ value: '', label: '' }, ...options];
  const isOptionEqualToValue = (option, value) => {
    return option.value === value.value && option.label === value.label;
  };

  return (
    <FormControl size={DEFAULT_FIELD_SIZE} fullWidth>
      <Controller
      control={control}
      name={name}
      render={({ 
        field: { onChange, value },
        fieldState: { error },
      }) => {
        if(value===undefined || value===null) value=''
        return (
          <Autocomplete
          multiple={multiple}
          options={options}
          getOptionLabel={(option) => option.label || ''}
          value={ 
            multiple
              ? options.filter((option) => value.includes(option.value))
              : options.find((option) => option.value === (value ?? '')) || ''
          }
          onChange={(event, newValue) => {
            if(!newValue)
                onChange(null)
            else 
            if (multiple) {
              onChange(newValue.map((option) => option.value));
            } else {
                onChange(newValue.value);
            }
            if (setSelectedFC) {
              const { setSelected } = setSelectedFC;
              if (typeof setSelected === "function") setSelected(newValue);
            }
          }}
          isOptionEqualToValue={isOptionEqualToValue}
          renderInput={(params) => 
            <TextField
            helperText={error ? error.message : null}
            error={!!error}
            label={label}
            variant={DEFAULT_FIELD_VARIANT}
            size={DEFAULT_FIELD_SIZE}
            {...params}
            {...props}
            />
          }
          />
        )
      }}
      />
    </FormControl>
  );
};

export default DynaAutocompleteField