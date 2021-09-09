import React from "react";
import {
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

export default function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  return (
    <Grid xs={12} sm={6}>
      <Controller
        render={({ field }) => (
          <TextField {...field} fullWidth label={label} required={required} />
        )}
        control={control}
        name={name}
        defaultValue=""
      />
   
    </Grid>
  );
}
