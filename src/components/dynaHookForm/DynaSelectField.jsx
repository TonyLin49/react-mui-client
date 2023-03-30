import { FormControl, InputLabel, MenuItem, Select  } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { DEFAULT_FIELD_SIZE, DEFAULT_FIELD_VARIANT } from "../../constants/globalConstant";

const DynaSelectField = ({
  name,
  control,
  label,
  options,
  setSelectedFC,
  props,
  multiple
}) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label} size={DEFAULT_FIELD_SIZE}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size={DEFAULT_FIELD_SIZE} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => {
          if(multiple){
            if(!value || value===null) value=[]
            if(typeof value==='string'){
              if(!value || value===null) 
                value=[]
              else {
                if(value.length>0)
                  value = [value]
                else 
                  value = []
              }
            }
          } 
          return (
          <Select 
            onChange={(newValue) => {
              onChange(newValue.target.value);
              if(setSelectedFC) {
                const {setSelected} = setSelectedFC
                if(typeof setSelected === 'function')
                  setSelected(newValue.target.value)
              }
            }} 
            value={value} 
            variant={DEFAULT_FIELD_VARIANT}
            size={DEFAULT_FIELD_SIZE}
            {...props}
            multiple={multiple}
          >
            {generateSingleOptions()}
          </Select>)}
        }
        control={control}
        name={name}
      />
    </FormControl>
  );
};

export default DynaSelectField