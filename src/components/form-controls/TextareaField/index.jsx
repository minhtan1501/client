import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

function TextareaField(props) {
  const { errors, name, label, control } = props;
  const hasError = errors[name];
  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={!!hasError}
      margin="normal"
    >
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextareaAutosize
            id={name}
            {...field}
            label={label}
            name={name}
            minRows={5}
            placeholder="Description"
          />
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

TextareaField.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextareaField;
