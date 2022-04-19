import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
function InputField(props) {
   const { errors, name, label,control} = props;
    const hasError = errors[name]
   return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
           fullWidth
           label={label}
           error={!!hasError}
           helperText={errors[name]?.message}
           variant="outlined"
           margin="normal"
           name={name}
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