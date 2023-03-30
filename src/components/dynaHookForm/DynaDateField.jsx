import React from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { DATE_FORMAT, DEFAULT_FIELD_SIZE, DEFAULT_FIELD_VARIANT } from "../../constants/globalConstant";

const DynaDateField = ({ name, control, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DesktopDatePicker
            fullWidth
            label={label}
            inputFormat={DATE_FORMAT}
            {...field}
            renderInput={(params) => 
            <TextField {...params} type='datetime-local'
              size={DEFAULT_FIELD_SIZE} 
              variant={DEFAULT_FIELD_VARIANT}
            />}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default DynaDateField