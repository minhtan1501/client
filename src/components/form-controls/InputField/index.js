import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
function InputField(props) {
   const { errors, name, label,control, register} = props;
    const hasError = errors[name]
   return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
           fullWidth
           label={label}
        //   disabled={disabled}
           error={!!hasError}
           helperText={errors[name]?.message}
           variant="outlined"
           margin="normal"
           name={name}
        //    valueName={value}
        //   onTextChange={(val) => onChange(value)}
        //   onTextBlur={(val) => onBlur(value)}
        {...field}
        />
      )}
      rules={{ required: true }}
    />
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;