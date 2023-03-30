import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@mui/material";
import { Box } from "@mui/system";

const DynaCheckboxField = ({ control, name, label, props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
      }) => (
        <Box>
          <Checkbox
            onChange={(event) => {
              if (event.target.checked) {
                onChange("Y");
              } else {
                onChange("N");
              }
            }}
            checked={value === "Y"}
            {...props}
          />
          {label}
        </Box>
      )}
    />
  );
};

export default DynaCheckboxField